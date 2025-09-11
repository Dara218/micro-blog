<template>
  <!-- Modal Overlay -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="closeCreatePostModal">
    <!-- Modal Container -->
    <div class="w-full max-w-2xl rounded-xl bg-white shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h3 class="text-base font-semibold text-gray-900">Create Post</h3>
        <button
          type="button"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          @click="closeCreatePostModal">×</button>
      </div>

      <!-- Body -->
      <div class="home-page modal-scope">
        <section class="feed">
          <CreatePostForm
            :userAvatar="props.userAvatar"
            :userId="props.userId"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
  import CreatePostForm from './CreatePostForm.vue';

  const emit = defineEmits(['close-modal']);
  const props = defineProps([
    'userAvatar',
    'userId',
  ]);

  const closeCreatePostModal = () => emit('close-modal');
</script>
