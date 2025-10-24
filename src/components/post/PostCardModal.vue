<template>
  <!-- Overlay -->
  <div class="modal-overlay" @click.self="closeModal">
    <!-- Container -->
    <div class="modal-container" >
      <!-- Header -->
      <div class="modal-header"
        tabindex="0"
        ref="modalContainer"
        @keydown.prevent.stop.left="previousImage(postStore, postIndex)"
        @keydown.prevent.stop.right="nextImage(postStore, false, props.media)"
      >
        <div class="post-author">
          <div class="author-avatar">
            <img :src="props.avatarUrl" :alt="props.avatarUrl" />
          </div>
          <div class="author-info">
            <h4 class="author-name">{{ props.name }}</h4>
            <p class="post-meta">@janesmith • 2h ago</p>
          </div>
        </div>

        <button
          class="modal-close"
          type="button"
          @click="closeModal">×</button>
      </div>

      <!-- Body: media left, comments right -->
      <div class="post-modal">
        <div class="post-modal-media">
          <div v-if="imageUrls.length || videoUrls.length" class="w-full relative">
            <!-- Media counter placeholder (positioned top-right) -->
            <div class="media-counter">
              {{ postIndex + 1 }}/{{ props.media.length }}
            </div>

            <!-- Navigation arrows - show only if 2+ media items -->
            <button 
              v-if="(props.media || []).length > 1"
              @click.prevent.stop="previousImage(postStore, postIndex)"
              class="nav-arrow nav-arrow-left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button 
              v-if="(props.media || []).length > 1" 
              @click.prevent.stop="nextImage(postStore, false, props.media)"
              class="nav-arrow nav-arrow-right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <ZoomImg v-if="imageUrls.length"
              :src="imageUrls[postIndex]"
              :show-zoom-btns="true"
              zoom-type="drag"
            />

            <video
              v-if="videoUrls.length"
              :src="videoUrls[postIndex]"
              autoplay
              loop
              controls
              playsinline
              class="image-tile image-tile-md"
            />
          </div>
        </div>

        <div class="post-modal-comments">
          <div class="post-content">
            <p class="post-text">{{ props.content }}</p>
          </div>

          <div class="comments-scroll divide-y divide-gray-200">
            <div v-for="comment in localComments" :key="comment.id" class="comment-item flex items-start gap-3 py-3">
              <div class="author-avatar w-9 h-9 rounded-full overflow-hidden shrink-0">
                <img class="w-full h-full object-cover" :src="props.avatarUrl" :alt="props.avatarUrl" />
              </div>
              <div class="flex flex-col gap-2 flex-1">
                <div class="comment-body flex-1 min-w-0">
                  <div class="comment-meta flex items-baseline gap-2">
                    <span class="comment-name font-medium truncate">{{ props.name || 'User' }}</span>
                    <span class="comment-time text-gray-500 text-sm">• 1h</span>
                  </div>
                  <p class="comment-text mt-1 text-gray-800">{{ comment.content }}</p>
                </div>
                <!-- Post actions -->
                <PostActions
                  :authUserId="props.authUserId"
                  :commentCount="commentRepliesCount[comment.id]"
                  :likeCount="latestLikeCount"
                  :postId="props.postId"
                  :isLiked="latestLikeStatus"
                  type="comment"
                  @like-updated="handleLikeUpdate"
                />
                <!-- Replies section -->
                <div v-for="reply in comment.replies" :key="reply.id">
                  <Reply
                    :replies="[reply]"
                    :authUserId="props.authUserId"
                    @reply-like-updated="handleReplyLikeUpdate"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="comment-input">
            <textarea class="comment-field" type="text" placeholder="Write a comment..." />
            <button class="btn-create-post" type="button">Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';
  import { DEFAULT_USER_AVATAR } from '@/constants';
  import { usePartitionMedia, useConvertMediaToUrl } from '@/helpers/filterMedia';
  import { usePostStore } from '@/stores/usePostStore';
  import { ZoomImg } from 'vue3-zoomer';
  import { nextImage, previousImage } from '@/composables/usePostMedia';
  import { useGetLikeInfo } from '@/composables/useLikePost';
  import PostActions from './PostActions.vue';
  import Reply from '../comment/Reply.vue';

  const emit = defineEmits(['close', 'like-updated', 'reply-like-updated']);
  const props = defineProps({
    authUserId: { type: Number, default: null },
    avatarUrl: { type: String, default: DEFAULT_USER_AVATAR },
    name: { type: String, default: '' },
    content: { type: String, default: '' },
    media: { type: Array, default: () => [] },
    comments: { type: Array, default: () => [] },
    postId: { type: Number },
  });

  const latestLikeStatus = ref(false);
  const latestLikeCount = ref(0);
  const hasLikeChanged = ref(false);
  const replyLikeUpdates = ref({});

  const postStore = usePostStore();
  const postIndex = computed({
    get: () => postStore.postPreviewIndex,
    set: (val) => postStore.getPostPreviewIndex(val),
  });
  const modalContainer = ref(null);
  const commentRepliesCount = ref({});

  // Recursive function to update reply likes at any nesting level
  const updateReplyLikes = (replies) => {
    if (!replies || replies.length === 0) return;
    
    for (const reply of replies) {
      // Update this reply if we have an update for it
      if (replyLikeUpdates.value[reply.id]) {
        reply.like_count = replyLikeUpdates.value[reply.id].likeCount;
        reply.is_liked = replyLikeUpdates.value[reply.id].isLiked;
      }
      
      // Recursively update nested replies
      if (reply.replies && reply.replies.length > 0) {
        updateReplyLikes(reply.replies);
      }
    }
  };

  // Computed property that merges props.comments with reply like updates
  const localComments = computed(() => {
    if (!props.comments || props.comments.length === 0) return [];
    
    // Deep clone to avoid mutating props
    const clonedComments = JSON.parse(JSON.stringify(props.comments));
    
    // Apply reply like updates recursively
    for (const comment of clonedComments) {
      if (comment.replies && comment.replies.length > 0) {
        updateReplyLikes(comment.replies);
      }
    }
    
    return clonedComments;
  });

  onMounted(async () => {
    modalContainer.value?.focus();
    await getLikeInfo();
  });

  const parts = computed(() => usePartitionMedia(props.media || []));
  const imageUrls = computed(() => useConvertMediaToUrl(parts.value.images));
  const videoUrls = computed(() => useConvertMediaToUrl(parts.value.videos));

  const getLikeInfo = async () => {
    try {
      const { data } = await useGetLikeInfo(props.postId, props.authUserId);
      const like = data?.data ?? null; // like is an object or null

      // true if a like exists, false otherwise
      latestLikeStatus.value = like?.deleted_at === null;

      // safe like_count, default to 0 if no like
      latestLikeCount.value = like?.likeable?.like_count ?? 0;
    } catch (error) {
      console.error(error.response?.data.message);
    }
  };

  const handleLikeUpdate = (likeData) => {
    latestLikeStatus.value = likeData.isLiked;
    latestLikeCount.value = likeData.likeCount;
    hasLikeChanged.value = true;
  };

  const handleReplyLikeUpdate = (likeData) => {
    // Store reply like updates - the computed property will merge these with props.comments
    replyLikeUpdates.value[likeData.replyId] = {
      likeCount: likeData.likeCount,
      isLiked: likeData.isLiked
    };
  };

  const closeModal = () => {
    if (hasLikeChanged.value) {
      emit('like-updated', {
        postId: props.postId,
        likeCount: latestLikeCount.value,
        isLiked: latestLikeStatus.value
      });
    }
    
    // Emit reply like updates if any
    if (Object.keys(replyLikeUpdates.value).length > 0) {
      emit('reply-like-updated', replyLikeUpdates.value);
    }
    
    emit('close');
  };
</script>