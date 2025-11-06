import { api } from "../common/http";
import { API_ENDPOINTS } from "@/constants"

/**
 * Retrieves the comments of a post.
 *
 * @param id - The post id.
 *
 * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
 */
export const getPostCommentsByParentId = (id) => {
  return api.get(API_ENDPOINTS.COMMENT.GET_COMMENTS(id));
}

/**
 * Builds a FormData object for creating a comment.
 *
 * @param {Object} data - The comment payload.
 * @param {string} data.content - The text content of the comment.
 * @param {number} data.post_id - The parent post ID this comment belongs to.
 * @param {number} data.user_id - The authoring user ID.
 * @param {number} data.like_count - Initial like count (usually 0).
 *
 * @returns {FormData} A FormData instance containing the comment data.
 */
export const buildPostFormData = (data) => {
  const formData = new FormData;

  formData.append('content', data.content);
  formData.append('post_id', data.post_id);
  formData.append('user_id', data.user_id);
  formData.append('like_count', data.like_count);

  return formData;
}

/**
 * Sends a comment creation request to the API.
 *
 * @param {FormData} data - The form data containing comment content and metadata.
 *
 * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
 */
export const createComment = data => {
  return api.post(API_ENDPOINTS.COMMENT.CREATE_COMMENT, data);
};