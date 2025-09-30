<template>
  <div class="image-preview" :class="{ 'max-w-none': isPostCreation }" v-if="props.images">
    <!-- 1 image -->
    <div v-if="props.images.length === 1" class="rounded-xl overflow-hidden">
      <img
        :src="isUrl ? props.images[0] : useCreateObjectUrl(props.images[0])"
        key="1"
        class="image-tile"
        @click="openPostModal(0)"
      />
    </div>

    <!-- 2 images -->
    <div v-else-if="props.images.length === 2" class="image-grid">
      <img
        v-for="(src, index) in props.images"
        :key="index"
        :src="isUrl ? props.images[index] : useCreateObjectUrl(src)"
        class="image-tile image-tile-md"
        @click="openPostModal(index)"
      />
    </div>

    <!-- 3 images -->
    <div v-else-if="props.images.length === 3" class="image-grid">
      <!-- Big image on left -->
      <img
        key="0"
        :src="isUrl ? props.images[0] : useCreateObjectUrl(props.images[0])"
        class="image-tile image-tile-lg col-span-1 row-span-2"
        @click="openPostModal(0)"
      />

      <!-- Two stacked on right -->
      <div class="flex flex-col gap-1">
      <img
        key="1"
        :src="isUrl ? props.images[1] : useCreateObjectUrl(props.images[1])"
        class="image-tile image-tile-sm"
        @click="openPostModal(1)"
      />
      <img
        key="2"
        :src="isUrl ? props.images[2] : useCreateObjectUrl(props.images[2])"
        class="image-tile image-tile-sm"
        @click="openPostModal(2)"
      />
      </div>
    </div>

    <!-- 4 or more images -->
    <div v-else-if="props.images.length >= 4" class="image-grid">
      <img
        v-for="(src, index) in props.images.slice(0,3)"
        :key="index"
        :src="isUrl ? props.images[index] : useCreateObjectUrl(src)"
        class="image-tile image-tile-sm"
        @click="openPostModal(index)"
      />
      <div class="tile-wrapper">
        <img
          :key="3"
          :src="isUrl ? props.images[3] : useCreateObjectUrl(props.images[3])"
          class="image-tile image-tile-sm"
          @click="openPostModal(3)"
        />
        <div v-if="props.images.length > 4" class="tile-overlay cursor-pointer" @click="openPostModal(3)">
          +{{ props.images.length - 4 }}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Video preview -->
  <div class="image-preview" :class="{ 'max-w-none': isPostCreation }" v-if="props.videos">
    <!-- 1 video -->
    <div v-if="props.videos.length === 1">
      <video
        :src="isUrl ? props.videos[0] : videoUrls[0]"
        class="image-tile"
        @click="openPostModal((props.images?.length || 0) + 0)"
      />
    </div>

    <!-- 2 videos -->
    <div v-else-if="props.videos.length === 2" class="image-grid">
      <video
        v-for="(src, index) in props.videos"
        :key="index"
        :src="isUrl ? props.videos[index] : useCreateObjectUrl(src)"
        class="image-tile image-tile-md"
        @click="openPostModal((props.images?.length || 0) + index)"
      />
    </div>

    <!-- 3 videos -->
    <div v-else-if="props.videos.length === 3" class="image-grid">
      <video
        :src="isUrl ? props.videos[0] : useCreateObjectUrl(props.videos[0])"
        class="image-tile image-tile-lg col-span-1 row-span-2"
        @click="openPostModal((props.images?.length || 0) + 0)"
      />
      <video
        :src="isUrl ? props.videos[1] :useCreateObjectUrl(props.videos[1])"
        class="image-tile image-tile-sm"
        @click="openPostModal((props.images?.length || 0) + 1)"
      />
      <video
        :src="isUrl ? props.videos[2] :useCreateObjectUrl(props.videos[2])"
        class="image-tile image-tile-sm"
        @click="openPostModal((props.images?.length || 0) + 2)"
      />
    </div>

    <!-- 4 or more videos -->
    <div v-else-if="props.videos.length >= 4" class="image-grid">
      <video
        v-for="(src, index) in props.videos.slice(0,3)"
        :key="index"
        :src="isUrl ? props.videos[index] : useCreateObjectUrl(src)"
        class="image-tile image-tile-sm"
        @click="openPostModal((props.images?.length || 0) + index)"
      />
      <div class="tile-wrapper">
        <video
          :key="3"
          :src="isUrl ? props.videos[3] :useCreateObjectUrl(props.videos[3])"
          class="image-tile image-tile-sm"
          @click="openPostModal((props.images?.length || 0) + 3)"
        />
        <div v-if="props.videos.length > 4" class="tile-overlay cursor-pointer">
          +{{ props.videos.length - 4 }}
        </div>
      </div>
    </div>
  </div>

  <div class="modal-overlay" v-if="isOpenPostModal && isPostCreation" @click.self="openPostModal()">
    <!-- Container -->
    <div
      class="modal-container"
      :style="modalStyles"
      tabindex="0"
      ref="modalContainer"
      @keydown.left.prevent.stop="previousImage(postStore, index)"
      @keydown.right.prevent.stop="nextImage(
        postStore,
        true,
        null,
        props.images,
        props.videos
      )"
    >
      <div v-if="props.images || props.videos" class="w-full relative">
        <!-- Media counter placeholder (positioned top-right) -->
        <div class="media-counter">
          {{ index + 1 }}/{{ props.images ? props.images.length : props.videos.length  }}
        </div>

        <!-- Navigation arrows - show only if 2+ media items -->

        <!-- Left arrow -->
        <button
          type="button"
          v-if="(props.images?.length || 0) + (props.videos?.length || 0) > 1" 
          @click.stop="previousImage(postStore, index)"
          class="nav-arrow nav-arrow-left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Right arrow -->
        <button
          type="button"
          v-if="(props.images?.length || 0) + (props.videos?.length || 0) > 1" 
          @click.stop="nextImage(
            postStore,
            true,
            null,
            props.images,
            props.videos
          )"
          class="nav-arrow nav-arrow-right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <ZoomImg v-if="currentMediaIsImage"
          :src="currentMediaSrc"
          zoom-type="drag"
        />

        <video v-if="currentMediaIsVideo"
          :src="currentMediaSrc"
          autoplay
          loop
          controls
          playsinline
        />
      </div>
    </div>
  </div>

  <PostCardModal v-if="isOpenPostModal && !isPostCreation"
    :avatarUrl="props.avatarUrl"
    :name="props.name"
    :content="props.content"
    :media="mediaForModal"
    @close="openPostModal()"
  />
</template>

<script setup>
  import { useCreateObjectUrl } from '@/helpers/createObjectUrl';
  import { computed, nextTick, ref } from 'vue';
  import { usePostStore } from '@/stores/usePostStore';
  import { nextImage, previousImage } from '@/composables/usePostMedia';
  import { ZoomImg } from 'vue3-zoomer';
  import PostCardModal from './PostCardModal.vue';

  const postStore = usePostStore();
  const index = computed({
    get: () => postStore.postPreviewIndex,
    set: (val) => postStore.getPostPreviewIndex(val),
  });

  const props = defineProps({
    name: { type: String },
    avatarUrl: { type: String },
    content: { type: String },
    images: { type: Array, default: () => [] },
    videos: { type: Array, default: () => [] },
    isUrl: { type: Boolean, default: false },
    isPostCreation: { type: Boolean, default: false }
  });

  const modalContainer = ref(null);
  const isOpenPostModal = ref(false);

  const mediaUrls = ((mediaType, isUrl) => isUrl
    ? mediaType
    : mediaType.map(file => useCreateObjectUrl(file))
  );
  const videoUrls = computed(() => mediaUrls(props.videos, props.isUrl));

  // Prepare media objects for the modal in a single place
  const mediaForModal = computed(() => {
    const toUrl = (item) => (props.isUrl ? item : useCreateObjectUrl(item));
    const images = (props.images || []).map(toUrl).map(url => ({ url }));
    const videos = (props.videos || []).map(toUrl).map(url => ({ url }));

    return [...images, ...videos];
  });

  // Get current media based on the selected index
  const currentMediaSrc = computed(() => {
    const imageCount = props.images ? props.images.length : 0;
    
    if (index.value < imageCount && props.images) {
      // It's an image
      return props.isUrl
        ? props.images[index.value]
        : useCreateObjectUrl(props.images[index.value]);
    } else if (props.videos) {
      // It's a video
      const videoIndex = index.value - imageCount;

      return props.isUrl
        ? props.videos[videoIndex]
        : useCreateObjectUrl(props.videos[videoIndex]);
    }

    return null;
  });

  const currentMediaIsImage = computed(() => {
    const imageCount = props.images ? props.images.length : 0;

    return index.value < imageCount && props.images;
  });

  const currentMediaIsVideo = computed(() => {
    const imageCount = props.images ? props.images.length : 0;

    return index.value >= imageCount && props.videos;
  });

  const modalStyles = computed(() => {
    const totalMedia = (props.images?.length || 0) + (props.videos?.length || 0);
    
    if (totalMedia === 1) {
      return {
        maxWidth: '80vw',
        maxHeight: '80vh',
        margin: '2rem'
      };
    } else if (totalMedia === 2) {
      return {
        maxWidth: '85vw',
        maxHeight: '80vh',
        margin: '1.5rem'
      };
    } else {
      return {
        maxWidth: '90vw',
        maxHeight: '75vh',
        margin: '1rem'
      };
    }
  });

  const openPostModal = (index) => {
    // Only update index if provided (when opening modal)
    if (index !== undefined) postStore.getPostPreviewIndex(index);

    isOpenPostModal.value = !isOpenPostModal.value;

    nextTick(() => modalContainer.value?.focus());
  };
</script>
