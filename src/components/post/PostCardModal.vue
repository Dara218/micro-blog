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
          <div v-if="imageUrls.length || videoUrls.length" class="w-full">
            <img
              v-if="imageUrls.length"
              :src="imageUrls[postIndex]"
              class="image-tile image-tile-md"
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
  import { computed, onMounted, ref } from 'vue';
  import { DEFAULT_USER_AVATAR } from '@/constants';
  import { usePartitionMedia, useConvertMediaToUrl } from '@/helpers/filterMedia';
  import { usePostStore } from '@/stores/usePostStore';

  const emit = defineEmits(['close']);
  const props = defineProps([
    'avatarUrl',
    'name',
    'content',
    'media',
  ]);
  const postIndex = ref(0);
  const post = usePostStore();

  onMounted(() => postIndex.value = post.postPreviewIndex);

  const parts = computed(() => usePartitionMedia(props.media || []));
  const imageUrls = computed(() => useConvertMediaToUrl(parts.value.images));
  const videoUrls = computed(() => useConvertMediaToUrl(parts.value.videos));
</script>