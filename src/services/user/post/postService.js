import axios from "axios";

/**
 * Builds a FormData object for posting content with media and settings.
 *
 * @param {string} param0.content - The text content of the post.
 * @param {File[]} param0.images - List of image files to upload.
 * @param {File[]} param0.videos - List of video files to upload.
 * @param {boolean} param0.isAllowComments - Whether comments are allowed.
 * @param {boolean} param0.isAllowShares - Whether shares are allowed.
 *
 * @returns {FormData} A FormData instance containing the post data.
 */
export const buildPostFormData = ({
  content,
  images,
  videos,
  isAllowComments,
  isAllowShares,
}) => {
  const formData = new FormData();

  formData.append('content', content);
  images.forEach(file => formData.append('images[]', file));
  videos.forEach(file => formData.append('videos[]', file));
  formData.append('allow_comments', String(isAllowComments));
  formData.append('allow_shares', String(isAllowShares));

  return formData;
}

/**
 * Sends a post creation request to the API.
 *
 * @param {FormData} formData - The form data containing post content and media.
 *
 * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
 */
export const createPostRequest = (formData) => {
  console.log('Post Created.');
  
  // return axios.post('/api/post/store', formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' },
  // });
}