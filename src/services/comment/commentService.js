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