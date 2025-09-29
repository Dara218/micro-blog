import { defineStore } from "pinia";

export const usePostStore = defineStore('post', {
  state: () => ({
    postPreviewIndex: 0,
    error: null,
  }),
  actions: {
    /**
     * Set the post preview index.
     *
     * @param {number} index - The index of the post to preview
     */
    getPostPreviewIndex(index) {
      try {
        this.postPreviewIndex = index;
      } catch (error) {
        this.error = 'Error showing the post media';
      }
    }
  }
});