<template>
  <div class="image-preview">
    <!-- 1 image -->
    <div v-if="props.images.length === 1" class="rounded-xl overflow-hidden">
      <img :src="useCreateObjectUrl(props.images[0])" class="image-tile" />
    </div>

    <!-- 2 images -->
    <div v-else-if="props.images.length === 2" class="image-grid">
      <img v-for="(src, index) in props.images" :key="index" :src="useCreateObjectUrl(src)" class="image-tile image-tile-md">
    </div>

    <!-- 3 images -->
    <div v-else-if="props.images.length === 3" class="image-grid">
      <!-- Big image on left -->
      <img :src="useCreateObjectUrl(props.images[0])" class="image-tile image-tile-lg col-span-1 row-span-2" />
      <!-- Two stacked on right -->
      <div class="flex flex-col gap-1">
        <img :src="useCreateObjectUrl(props.images[1])" class="image-tile image-tile-sm" />
        <img :src="useCreateObjectUrl(props.images[2])" class="image-tile image-tile-sm" />
      </div>
    </div>

    <!-- 4 or more images -->
    <div v-else-if="props.images.length >= 4" class="image-grid">
      <img v-for="(src, i) in props.images.slice(0,3)" :key="i" :src="useCreateObjectUrl(src)" class="image-tile image-tile-sm" />
      <div class="tile-wrapper">
        <img :src="useCreateObjectUrl(props.images[3])" class="image-tile image-tile-sm" />
        <div v-if="props.images.length > 4" class="tile-overlay">
          +{{ props.images.length - 4 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useCreateObjectUrl } from '@/helpers/createObjectUrl';

  const props = defineProps(['images']);
</script>