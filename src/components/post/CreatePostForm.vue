<template>
  <form class="create-post-card" @submit.prevent="onSubmit">
    <div class="form flex-col">
      <div class="create-post-header">
        <div class="user-avatar-small">
          <img :src="props.userAvatar" :alt="props.userAvatar" />
        </div>
        <div class="w-full flex-1">
          <textarea
            class="create-post-input w-full"
            placeholder="What's on your mind?"
            rows="3"
            v-model="form.content"
          ></textarea>
          <p class="form-error" v-if="v$.content.$error">{{ v$.content.$errors[0].$message }}</p>
          <p class="form-error" v-if="serverError">{{ serverError }}</p>
        </div>
      </div>
    </div>

    <div class="create-post-actions">
      <label class="action-btn file-input-label">
        <input
          type="file"
          accept="image/*"
          multiple
          class="file-input"
          @change="onImageChange"
        />
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>Photo</span>
      </label>

      <label class="action-btn file-input-label">
        <input
          type="file"
          accept="video/*"
          multiple
          class="file-input"
          @change="onVideoChange"
        />
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <span>Video</span>
      </label>

      <button class="action-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
        <span>Poll</span>
      </button>

      <button class="action-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span>Location</span>
      </button>

      <button class="action-btn">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Mood</span>
      </button>
    </div>

    <!-- Image preview -->
    <ImagePreview
      :images="form.images"
      :isUrl="false"
      v-if="!v$.images.$error"
    />

    <!-- Image error validation -->
    <ul class="form-error" v-if="v$.images.$error">
      <li v-if="v$.images.fileType.$invalid">{{ v$.images.fileType.$message }}</li>
      <li v-if="!v$.images.fileType.$invalid && v$.images.fileSize.$invalid">{{ v$.images.fileSize.$message }}</li>
      <li v-if="v$.images.maxFiles.$invalid">{{ v$.images.maxFiles.$message }}</li>
    </ul>

    <div class="create-post-footer">
      <div class="post-options">
        <label class="option-item">
          <input type="checkbox" v-model="form.isAllowComments"/>
          <span>Allow comments</span>
        </label>
        <label class="option-item">
          <input type="checkbox" v-model="form.isAllowShares"/>
          <span>Allow shares</span>
        </label>
      </div>
      <button type="submit" class="btn-post" :disabled="v$.images.$error || (isPostButtonDisabled || isSubmitting)">
        Post
      </button>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue';
  import { useCreatePost } from '@/composables/useCreatePost';
  import ImagePreview from './ImagePreview.vue';

  const props = defineProps([
    'userAvatar',
    'userId',
  ]);
  const emit = defineEmits(['new-post']);

  const serverError = ref('');
  const {
    form,
    v$,
    isSubmitting,
    isPostButtonDisabled,
    onImageChange,
    onVideoChange,
    processPost,
  } = useCreatePost(props.userId);

  const onSubmit = async () => {
    serverError.value = '';

    try {
      const createdPost = await processPost();

      if (createdPost) emit('new-post', createdPost);
    } catch (error) {
      serverError.value = error;
    }
  };
</script>