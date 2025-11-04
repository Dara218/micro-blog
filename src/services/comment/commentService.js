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

export const buildPostFormData = (data) => {
  const formData = new FormData;

  formData.append('content', data.content);
  formData.append('post_id', data.post_id);
  formData.append('user_id', data.user_id);
  formData.append('like_count', data.like_count);

  return formData;
}

export const createComment = data => {
  return api.post(API_ENDPOINTS.COMMENT.CREATE_COMMENT, data);
};