<template>
  <div class="image-preview" v-if="props.images">
    <!-- 1 image -->
    <div v-if="props.images.length === 1" class="rounded-xl overflow-hidden">
      <img
        :src="isUrl ? props.images[0] : useCreateObjectUrl(props.images[0])"
        key="1"
        class="image-tile"
      />
    </div>

    <!-- 2 images -->
    <div v-else-if="props.images.length === 2" class="image-grid">
      <img
        v-for="(src, index) in props.images"
        :key="index"
        :src="isUrl ? props.images[index] : useCreateObjectUrl(src)"
        class="image-tile image-tile-md"
      />
    </div>

    <!-- 3 images -->
    <div v-else-if="props.images.length === 3" class="image-grid">
      <!-- Big image on left -->
      <img
        key="0"
        :src="isUrl ? props.images[0] : useCreateObjectUrl(props.images[0])"
        class="image-tile image-tile-lg col-span-1 row-span-2"
      />

      <!-- Two stacked on right -->
      <div class="flex flex-col gap-1">
      <img
        key="1"
        :src="isUrl ? props.images[1] : useCreateObjectUrl(props.images[1])"
        class="image-tile image-tile-sm"
      />
      <img
        key="2"
        :src="isUrl ? props.images[2] : useCreateObjectUrl(props.images[2])"
        class="image-tile image-tile-sm"
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
      />
      <div class="tile-wrapper">
        <img
          :key="3"
          :src="isUrl ? props.images[3] : useCreateObjectUrl(props.images[3])"
          class="image-tile image-tile-sm"
        />
        <div v-if="props.images.length > 4" class="tile-overlay cursor-pointer">
          +{{ props.images.length - 4 }}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Video preview -->
  <div class="image-preview" v-if="props.videos">
    <!-- 1 video -->
    <div v-if="props.videos.length === 1">
      <video
        :src="isUrl ? props.videos[0] : videoUrls[0]"
        controls
        playsinline
        class="image-tile"
      />
    </div>

    <!-- 2 videos -->
    <div v-else-if="props.videos.length === 2" class="image-grid">
      <video
        v-for="(src, index) in props.videos"
        :key="index"
        :src="isUrl ? props.videos[index] :useCreateObjectUrl(src)"
        controls
        playsinline
        class="image-tile image-tile-md"
      />
    </div>

    <!-- 3 videos -->
    <div v-else-if="props.videos.length === 3" class="image-grid">
      <video
        :src="isUrl ? props.videos[0] : useCreateObjectUrl(props.videos[0])"
        controls
        playsinline
        class="image-tile image-tile-lg col-span-1 row-span-2"
      />
      <video
        :src="isUrl ? props.videos[1] :useCreateObjectUrl(props.videos[1])"
        controls
        playsinline
        class="image-tile image-tile-sm"
      />
      <video
        :src="isUrl ? props.videos[2] :useCreateObjectUrl(props.videos[2])"
        controls
        playsinline
        class="image-tile image-tile-sm"
      />
    </div>

    <!-- 4 or more videos -->
    <div v-else-if="props.videos.length >= 4" class="image-grid">
      <video
        v-for="(src, index) in props.videos.slice(0,3)"
        :key="index"
        :src="isUrl ? props.videos[index] : useCreateObjectUrl(src)"
        controls
        playsinline
        class="image-tile image-tile-sm"
      />
      <div class="tile-wrapper">
        <video
          :key="3"
          :src="isUrl ? props.videos[3] :useCreateObjectUrl(props.videos[3])"
          controls
          playsinline
          class="image-tile image-tile-sm"
        />
        <div v-if="props.videos.length > 4" class="tile-overlay cursor-pointer">
          +{{ props.videos.length - 4 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useCreateObjectUrl } from '@/helpers/createObjectUrl';
  import { computed, ref } from 'vue';
  // import VueEasyLightbox from 'vue-easy-lightbox';

  const props = defineProps({
    images: { type: Array, default: () => [] },
    videos: { type: Array, default: () => [] },
    isUrl: { type: Boolean, default: false },
  });

  const mediaUrls = ((mediaType, isUrl) => isUrl
    ? mediaType
    : mediaType.map(file => useCreateObjectUrl(file))
  );

  const videoUrls = computed(() => mediaUrls(props.videos, props.isUrl));
</script>
