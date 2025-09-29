<template>
  <!-- Overlay -->
  <div class="modal-overlay" @click.self="emit('close')">
    <!-- Container -->
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header">
        <div class="post-author">
          <div class="author-avatar">
            <img :src="props.avatarUrl ?? DEFAULT_USER_AVATAR" :alt="props.avatarUrl" />
          </div>
          <div class="author-info">
            <h4 class="author-name">{{ props.name }}</h4>
            <p class="post-meta">@janesmith • 2h ago</p>
          </div>
        </div>
        <button class="modal-close" type="button" @click="emit('close')">×</button>
      </div>

      <!-- Body: media left, comments right -->
      <div class="post-modal">
        <div class="post-modal-media">
          <div v-if="imageUrls.length || videoUrls.length" class="w-full relative">
            <!-- Navigation arrows - show only if 2+ media items -->
            <button 
              v-if="(props.media || []).length > 1"
              @click.stop="previousImage()"
              class="nav-arrow nav-arrow-left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button 
              v-if="(props.media || []).length > 1" 
              @click.stop="nextImage()"
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

            <!-- Todo: Media counter -->
          </div>
        </div>

        <div class="post-modal-comments">
          <div class="post-content">
            <p class="post-text">{{ props.content }}</p>
          </div>

          <div class="comments-scroll">
            <div class="comment-item" v-for="i in 10" :key="i">
              <div class="author-avatar">
                <img :src="props.avatarUrl ?? DEFAULT_USER_AVATAR" :alt="props.avatarUrl" />
              </div>
              <div class="comment-body">
                <div class="comment-meta">
                  <span class="comment-name">{{ props.name || 'User' }}</span>
                  <span class="comment-time">• 1h</span>
                </div>
                <p class="comment-text">Nice shot! Love this.</p>
              </div>
            </div>
          </div>

          <div class="comment-input">
            <input class="comment-field" type="text" placeholder="Write a comment..." />
            <button class="comment-send" type="button">Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { DEFAULT_USER_AVATAR } from '@/constants';
  import { usePartitionMedia, useConvertMediaToUrl } from '@/helpers/filterMedia';
  import { usePostStore } from '@/stores/usePostStore';
  import { ZoomImg } from 'vue3-zoomer';

  const emit = defineEmits(['close']);
  const props = defineProps([
    'avatarUrl',
    'name',
    'content',
    'media',
  ]);
  const post = usePostStore();

  const postIndex = computed({
    get: () => post.postPreviewIndex,
    set: (val) => post.getPostPreviewIndex(val),
  });

  const parts = computed(() => usePartitionMedia(props.media || []));
  const imageUrls = computed(() => useConvertMediaToUrl(parts.value.images));
  const videoUrls = computed(() => useConvertMediaToUrl(parts.value.videos));

  const previousImage = () => {
    if (postIndex.value === 0) return;

    postIndex.value -= 1;
  };

  const nextImage = () => {
    const totalMedia = (props.media?.length || 0);

    if (postIndex.value >= totalMedia - 1) return;

    postIndex.value += 1;
  };
</script>