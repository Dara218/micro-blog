<template>
  <!-- Overlay -->
  <div class="modal-overlay" @click.self="closeModal">
    <!-- Container -->
    <div :class="['modal-container', 'relative', props.hasMedia ? 'has-media' : 'no-media']" >
      <!-- Floating close button (top-left) -->
      <div
        tabindex="0"
        ref="modalContainer"
        @keydown.prevent.stop.left="previousImage(postStore, postIndex)"
        @keydown.prevent.stop.right="nextImage(postStore, false, props.media)"
      ></div>
      <button
        class="modal-close absolute right-3 top-3 z-20"
        type="button"
        @click="closeModal">×</button>

      <!-- Body: media left, details right -->
      <div :class="props.hasMedia ? 'post-modal' : ''">
        <!-- Left: Media viewer -->
        <div class="post-modal-media bg-black flex items-center justify-center" v-if="props.hasMedia">
          <div v-if="imageUrls.length || videoUrls.length" class="w-full relative">
            <!-- Navigation arrows - show only if 2+ media items -->
            <button 
              v-if="(props.media || []).length > 1"
              @click.prevent.stop="previousImage(postStore, postIndex)"
              class="nav-arrow nav-arrow-left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <button 
              v-if="(props.media || []).length > 1" 
              @click.prevent.stop="nextImage(postStore, false, props.media)"
              class="nav-arrow nav-arrow-right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <ZoomImg
              v-if="imageUrls.length"
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

        <!-- Right: Details/comments rail -->
        <div class="post-modal-comments flex flex-col bg-white">
          <!-- Header: Author + timestamp -->
          <div class="flex items-center justify-between pb-2 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full overflow-hidden">
                <img class="w-full h-full object-cover" :src="props.avatarUrl" :alt="props.avatarUrl" />
              </div>
              <div class="leading-tight">
                <div class="font-semibold text-gray-900">{{ props.name || 'User' }}</div>
                <div class="text-gray-500 text-xs">• 2h</div>
              </div>
            </div>
          </div>

          <!-- Post text/content -->
          <div class="post-content py-3">
            <p class="post-text whitespace-pre-line">{{ props.content }}</p>
          </div>

          <!-- Actions + counts (like/comment/share) -->
          <div class="actions-bar py-2">
            <PostActions
              :authUserId="props.authUserId"
              :commentCount="commentCount"
              :likeCount="props.likeCount"
              :postId="props.postId"
              :isLiked="props.isLiked"
              type="post"
              @like-updated="(likeData) => $emit('like-updated', likeData)"
            />
          </div>

          <!-- Comments list -->
          <div class="comments-scroll divide-y divide-gray-100">
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
                  :likeCount="Number(comment.like_count) || 0"
                  :postId="comment.id"
                  :isLiked="comment.is_liked || false"
                  type="comment"
                  @like-updated="(likeData) => handleCommentLikeUpdate(comment.id, likeData)"
                />
                <!-- Replies section -->
                <div v-for="reply in comment.replies" :key="reply.id" class="ml-10">
                  <Reply
                    :replies="[reply]"
                    :authUserId="props.authUserId"
                    @reply-like-updated="handleReplyLikeUpdate"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Composer -->
          <div class="comment-input border-t border-gray-200 pt-2 mt-2 w-full">
            <div class="flex items-center gap-2 w-full">
              <div class="w-8 h-8 rounded-full overflow-hidden shrink-0">
                <img class="w-full h-full object-cover" :src="props.avatarUrl" :alt="props.avatarUrl" />
              </div>
              <textarea 
                v-model="comment"
                class="comment-field flex-1 w-full"
                type="text"
                placeholder="Write a comment..."
              />
              <button class="btn-create-post" type="button" @click="submitComment">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * Todo:
   * - Add loading/limit so 10 comments is posted 1st. When reached the bottom upon scrolling, load 10 more
   */
  import { computed, onMounted, ref } from 'vue';
  import { DEFAULT_USER_AVATAR } from '@/constants';
  import { usePartitionMedia, useConvertMediaToUrl } from '@/helpers/filterMedia';
  import { usePostStore } from '@/stores/usePostStore';
  import { ZoomImg } from 'vue3-zoomer';
  import { nextImage, previousImage } from '@/composables/usePostMedia';
  import { useGetLikeInfo } from '@/composables/useLikePost';
  import { buildPostFormData, createComment } from '@/services/comment/commentService';
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
    postId: { type: Number, default: 0 },
    isLiked: { type: Boolean, default: false },
    likeCount: { type: Number, default: 0 },
    hasMedia: { type: Boolean, default: false }
  });

  const latestLikeStatus = ref(false);
  const latestLikeCount = ref(0);
  const hasLikeChanged = ref(false);
  const replyLikeUpdates = ref({});
  const comment = ref(null);
  const comments = ref(props.comments);
  const commentCount = computed(() => comments.value.length);

  const postStore = usePostStore();
  const postIndex = computed({
    get: () => postStore.postPreviewIndex,
    set: (val) => postStore.getPostPreviewIndex(val),
  });
  const modalContainer = ref(null);
  const commentRepliesCount = ref({});

  /**
   * Recursively apply like state updates to a nested replies array.
   *
   * @param {Array} replies - List of reply objects, each may contain nested `replies`.
   *
   * @returns {void}
   */
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

  /**
   * Comments merged with in-session like updates for comments and replies.
   * Deep-clones source to avoid mutating props, then applies pending like changes.
   *
   * @returns {Array<{
   *   id: number,
   *   content: string,
   *   like_count: number,
   *   is_liked: boolean,
   *   replies?: Array<any>
   * }>} Updated comments array safe for rendering
   */
  const localComments = computed(() => {
    if (!comments.value || comments.value.length === 0) return [];
    
    // Deep clone to avoid mutating props
    const clonedComments = JSON.parse(JSON.stringify(comments.value));
    
    // Apply like updates to comments and their replies
    for (const comment of clonedComments) {
      // Update the comment itself if we have an update for it
      if (replyLikeUpdates.value[comment.id]) {
        comment.like_count = replyLikeUpdates.value[comment.id].likeCount;
        comment.is_liked = replyLikeUpdates.value[comment.id].isLiked;
      }
      
      // Apply reply like updates recursively
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

  /**
   * Fetch latest like status and count for the current post/user.
   *
   * @returns {void}
   */
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

  /**
   * Handle like status updates for a top-level comment.
   *
   * @param {number} commentId - The comment identifier.
   * @param {{ likeCount: number, isLiked: boolean }} likeData - Updated like info.
   *
   * @returns {void}
   */
  const handleCommentLikeUpdate = (commentId, likeData) => {
    // Store comment like updates - the computed property will merge these
    replyLikeUpdates.value[commentId] = {
      likeCount: likeData.likeCount,
      isLiked: likeData.isLiked,
    };
  };

  /**
   * Handle like status updates for a nested reply.
   *
   * @param {{ replyId: number, likeCount: number, isLiked: boolean }} likeData - Updated like info for the reply.
   *
   * @returns {void}
   */
  const handleReplyLikeUpdate = (likeData) => {
    // Store reply like updates - the computed property will merge these with props.comments
    replyLikeUpdates.value[likeData.replyId] = {
      likeCount: likeData.likeCount,
      isLiked: likeData.isLiked,
    };
  };

  /**
   * Close the modal and emit any pending like state changes to the parent.
   *
   * @returns {void}
   */
  const closeModal = () => {
    if (hasLikeChanged.value) {
      emit('like-updated', {
        postId: props.postId,
        likeCount: latestLikeCount.value,
        isLiked: latestLikeStatus.value,
      });
    }
    
    // Emit reply like updates if any
    if (Object.keys(replyLikeUpdates.value).length > 0) {
      emit('reply-like-updated', replyLikeUpdates.value);
    }
    
    emit('close');
  };

  /**
   * Create a new comment for the current post and prepend it to the list.
   *
   * @returns {void}
   */
  const submitComment = async () => {
    try {
      const form = buildPostFormData({
        content: comment.value,
        post_id: props.postId,
        user_id: props.authUserId,
        like_count: 0,
      });

      const { data } = await createComment(form);

      comments.value.unshift(data.comment);

      comment.value = null;
    } catch (error) {
      console.error(error.response?.data.message);
    }
  };
</script>