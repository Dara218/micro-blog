<template>
  <article class="post-card">
    <div class="post-header">
      <div class="post-author">
        <div class="author-avatar">
          <img :src="props.avatarUrl ?? DEFAULT_USER_AVATAR" :alt="props.avatarUrl" />
        </div>
        <div class="author-info">
          <h4 class="author-name">{{ props.name }}</h4>
          <p class="post-meta">@janesmith • 2h ago</p>
        </div>
      </div>
      <button class="post-menu">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
        </svg>
      </button>
    </div>

    <div class="post-content">
      <p class="post-text">
        {{ props.content }}
      </p>
      <div class="post-image" v-if="props.media.length > 0">
        <ImagePreview
          :images="mediaUrls"
          :isUrl="true"
        />
      </div>
    </div>

    <div class="post-actions">
      <button class="action-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        <span>24</span>
      </button>
      <button class="action-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span>8</span>
      </button>
      <button class="action-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
        </svg>
        <span>Share</span>
      </button>
    </div>
  </article>
</template>

<script setup>
  import { computed } from 'vue';
  import { DEFAULT_USER_AVATAR } from '@/constants';
  import { mediaUrl } from '@/services/common/http';
  import ImagePreview from './ImagePreview.vue';

  const props = defineProps([
    'avatarUrl',
    'name',
    'content',
    'media',
  ]);

  const mediaUrls = computed(() => {
    return props.media?.map(media => mediaUrl(media.url)) || [];
  });
</script>