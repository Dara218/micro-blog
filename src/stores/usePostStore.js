import { defineStore } from "pinia";

export const usePostStore = defineStore('post', {
  state: () => ({
    postPreviewIndex: 0,
    error: null,
  }),
  actions: {
    /**
     * Set the post preview index.
     * Resets to 0 first, then updates with the given index.
     *
     * @param {number} index - The index of the post to preview
     */
    async getPostPreviewIndex(index) {
      try {
        // Reset the index
        this.postPreviewIndex = 0;

        this.postPreviewIndex = index;
      } catch (error) {
        this.error = 'Error showing the post media';
      }
    }
  }
});