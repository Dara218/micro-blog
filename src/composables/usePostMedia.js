/**
 * Navigates to the previous image in the post media gallery.
 *
 * @param {Object} postStore - The post store instance containing preview index state.
 * @param {number} postIndex - The current post index.
 *
 * @returns {void}
 */
export const previousImage = (postStore, postIndex) => {
  if (postIndex === 0) return;

  postIndex -= 1;

  postStore.getPostPreviewIndex(postIndex);
};

/**
 * Navigates to the next image in the post media gallery.
 *
 * @param {Object} postStore - The post store instance containing preview index state.
 * @param {boolean} isPostCreation - Whether this is for post creation mode or viewing mode.
 * @param {Array} [media=[]] - Array of media files (for viewing mode).
 * @param {Array} [images=[]] - Array of image files (for post creation mode).
 * @param {Array} [videos=[]] - Array of video files (for post creation mode).
 *
 * @returns {void}
 */
export const nextImage = (
  postStore,
  isPostCreation,
  media = [],
  images = [],
  videos = [],
) => {
  const totalMedia = isPostCreation
    ? (images?.length || 0) + (videos?.length || 0)
    : (media?.length || 0);

  if (totalMedia === 0) return;
  const nextIndex = Math.min(postStore.postPreviewIndex + 1, totalMedia - 1);

  postStore.getPostPreviewIndex(nextIndex);
};