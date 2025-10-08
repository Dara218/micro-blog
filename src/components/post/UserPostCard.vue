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
      <button class="post-menu" v-if="isOwnPost">
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
          :name="name"
          :avatarUrl="props.avatarUrl"
          :content="props.content"
          :images="imageUrls"
          :videos="videoUrls"
          :isUrl="true"
          :comments="props.comments"
        />
      </div>
    </div>

    <PostActions :commentCount="commentCount"/>
  </article>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';
  import { DEFAULT_USER_AVATAR } from '@/constants';
  import { usePartitionMedia, useConvertMediaToUrl } from '@/helpers/filterMedia';
  import ImagePreview from './ImagePreview.vue';
  import PostActions from './PostActions.vue';

  const props = defineProps([
    'avatarUrl',
    'name',
    'content',
    'media',
    'commentCount',
    'authUserId',
    'postUserId',
    'comments',
  ]);
  const isOwnPost = ref(false);

  onMounted(() => isOwnPost.value = props.authUserId === props.postUserId);

  const parts = computed(() => usePartitionMedia(props.media || []));
  const imageUrls = computed(() => useConvertMediaToUrl(parts.value.images));
  const videoUrls = computed(() => useConvertMediaToUrl(parts.value.videos));
</script>