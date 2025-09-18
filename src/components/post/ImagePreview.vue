<template>
  <div class="image-preview">
    <!-- 1 image -->
    <div v-if="props.images.length === 1" class="rounded-xl overflow-hidden">
      <img
        :src="useCreateObjectUrl(props.images[0])"
        key="1"
        @click="showImage(1)"
        class="image-tile"
      />
      <VueEasyLightbox
        :visible="visible"
        :imgs="imageUrls"
        :index="index"
        @hide="visible = false"
      />
    </div>

    <!-- 2 images -->
    <div v-else-if="props.images.length === 2" class="image-grid">
      <img
        v-for="(src, index) in props.images"
        :key="index"
        :src="useCreateObjectUrl(src)"
        @click="showImage(index)"
        class="image-tile image-tile-md"
      />
      <VueEasyLightbox
        :visible="visible"
        :imgs="imageUrls"
        :index="index"
        @hide="visible = false"
      />
    </div>

    <!-- 3 images -->
    <div v-else-if="props.images.length === 3" class="image-grid">
      <!-- Big image on left -->
      <img
        key="0"
        :src="useCreateObjectUrl(props.images[0])"
        @click="showImage(0)"
        class="image-tile image-tile-lg col-span-1 row-span-2"
      />

      <!-- Two stacked on right -->
      <div class="flex flex-col gap-1">
      <img
        key="1"
        :src="useCreateObjectUrl(props.images[1])"
        @click="showImage(1)"
        class="image-tile image-tile-sm"
      />
      <img
        key="2"
        :src="useCreateObjectUrl(props.images[2])"
        @click="showImage(2)"
        class="image-tile image-tile-sm"
      />
      </div>

      <VueEasyLightbox
        :visible="visible"
        :imgs="imageUrls"
        :index="index"
        @hide="visible = false"
      />
    </div>

    <!-- 4 or more images -->
    <div v-else-if="props.images.length >= 4" class="image-grid">
      <img
        v-for="(src, index) in props.images.slice(0,3)"
        :key="index"
        :src="useCreateObjectUrl(src)"
        @click="showImage(index)"
        class="image-tile image-tile-sm"
      />
      <div class="tile-wrapper">
        <img
          :key="3"
          :src="useCreateObjectUrl(props.images[3])"
          @click="showImage(3)"
          class="image-tile image-tile-sm"
        />
        <div v-if="props.images.length > 4" class="tile-overlay cursor-pointer" @click="showImage(3)">
          +{{ props.images.length - 4 }}
        </div>
      </div>

      <VueEasyLightbox
        :visible="visible"
        :imgs="imageUrls"
        :index="index"
        @hide="visible = false"
      />
    </div>
  </div>
</template>

<script setup>
  import { useCreateObjectUrl } from '@/helpers/createObjectUrl';
  import { computed, ref } from 'vue';
  import VueEasyLightbox from 'vue-easy-lightbox';

  const props = defineProps(['images']);

  const visible = ref(false);
  const index = ref(0);

  const showImage = (imgIndex) => {
    index.value = imgIndex;
    visible.value = true;
  };
  const imageUrls = computed(() => props.images.map(file => useCreateObjectUrl(file)));
</script>
