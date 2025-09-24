<template>
  <div class="image-preview" v-if="props.images">
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
        class="image-tile"
        @click="openPostModal(0)"
      />
    </div>

    <!-- 2 videos -->
    <div v-else-if="props.videos.length === 2" class="image-grid">
      <video
        v-for="(src, index) in props.videos"
        :key="index"
        :src="isUrl ? props.videos[index] : useCreateObjectUrl(src)"
        class="image-tile image-tile-md"
        @click="openPostModal(index)"
      />
    </div>

    <!-- 3 videos -->
    <div v-else-if="props.videos.length === 3" class="image-grid">
      <video
        :src="isUrl ? props.videos[0] : useCreateObjectUrl(props.videos[0])"
        class="image-tile image-tile-lg col-span-1 row-span-2"
        @click="openPostModal(0)"
      />
      <video
        :src="isUrl ? props.videos[1] :useCreateObjectUrl(props.videos[1])"
        class="image-tile image-tile-sm"
        @click="openPostModal(1)"
      />
      <video
        :src="isUrl ? props.videos[2] :useCreateObjectUrl(props.videos[2])"
        class="image-tile image-tile-sm"
        @click="openPostModal(2)"
      />
    </div>

    <!-- 4 or more videos -->
    <div v-else-if="props.videos.length >= 4" class="image-grid">
      <video
        v-for="(src, index) in props.videos.slice(0,3)"
        :key="index"
        :src="isUrl ? props.videos[index] : useCreateObjectUrl(src)"
        class="image-tile image-tile-sm"
        @click="openPostModal(index)"
      />
      <div class="tile-wrapper">
        <video
          :key="3"
          :src="isUrl ? props.videos[3] :useCreateObjectUrl(props.videos[3])"
          class="image-tile image-tile-sm"
          @click="openPostModal(3)"
        />
        <div v-if="props.videos.length > 4" class="tile-overlay cursor-pointer">
          +{{ props.videos.length - 4 }}
        </div>
      </div>
    </div>
  </div>

  <PostCardModal
    v-if="isOpenPostModal"
    :avatarUrl="props.avatarUrl"
    :name="props.name"
    :content="props.content"
    :media="mediaForModal"
    @close="openPostModal()"
  />
</template>

<script setup>
  import { useCreateObjectUrl } from '@/helpers/createObjectUrl';
  import { computed, ref } from 'vue';
  import PostCardModal from './PostCardModal.vue';
  import { usePostStore } from '@/stores/usePostStore';

  const post = usePostStore();

  const props = defineProps({
    name: { type: String },
    avatarUrl: { type: String },
    content: { type: String },
    images: { type: Array, default: () => [] },
    videos: { type: Array, default: () => [] },
    isUrl: { type: Boolean, default: false },
  });

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

  const openPostModal = (index => {
    post.getPostPreviewIndex(index);

    isOpenPostModal.value = !isOpenPostModal.value;
  });
</script>
