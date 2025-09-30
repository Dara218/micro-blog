<template>
  <!-- Modal Overlay -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:p-6" @click.self="closeCreatePostModal(false)">
    <!-- Modal Container -->
    <div class="w-full max-w-4xl max-h-[90vh] rounded-xl bg-white shadow-xl overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-200 px-4 py-3 flex-none">
        <h3 class="text-base font-semibold text-gray-900">Create Post</h3>
        <button
          type="button"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          @click="closeCreatePostModal(false)">×</button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-auto">
        <div class="home-page modal-scope">
          <section class="feed">
            <CreatePostForm
              :userAvatar="props.userAvatar"
              :userId="props.userId"
              @new-post="closeCreatePostModal"
            />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import CreatePostForm from './CreatePostForm.vue';

  const emit = defineEmits(['new-post']);
  const props = defineProps([
    'userAvatar',
    'userId',
  ]);

  const closeCreatePostModal = (newPost) => emit('new-post', newPost);
</script>
