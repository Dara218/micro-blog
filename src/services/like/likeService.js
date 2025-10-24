import { API_ENDPOINTS } from "@/constants";
import { api } from "../common/http";

/**
 * Sends a like creation request to the API.
 *
 * @param {Id} id - The post id.
 *
 * @returns {Promise<import('axios').AxiosResponse>} The Axios response promise.
 */
export const like = formData => {
  return api.post(API_ENDPOINTS.LIKE.POST_LIKE, formData);
};