import { API_ENDPOINTS } from "@/constants";
import { api } from "../common/http";

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
export const createPost = (formData) => {
  console.log('Post Created.');

  // return axios.post(`/api/post/{id}/store`, formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' },
  // });
}

/**
 * Retrieves a post with a specific ID from an API.
 *
 * @param id - The `id` parameter is the unique identifier of the post that you want to retrieve using
 * the `getPost` function.
 *
 * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
 */
export const getPost = (id) => api.get(API_ENDPOINTS.POST.GET_POST(id));

/**
 * Retrieve posts for a user's friends and home feed based on the provided ID.
 *
 * @param id - Used to specify the user or post ID for which you want to retrieve the corresponding posts.
 * 
 * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
 */
export const getFriendsPost = (id) => api.get(API_ENDPOINTS.POST.GET_FRIENDS_POST(id));

/**
 * Retrieves a specific post for display on the home page.
 *
 * @param id - Used to specify the unique identifier of the post that you want to retrieve for the home page.
 * 
 * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
 */
export const getHomePost = (id) => api.get(API_ENDPOINTS.POST.GET_HOME_POST(id));