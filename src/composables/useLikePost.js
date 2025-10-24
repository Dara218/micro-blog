import { API_ENDPOINTS } from "@/constants";
import { api } from "@/services/common/http";
import { like } from "@/services/like/likeService";

export const useLikePost = async (authUserId, id, type) => {
  try {
    const formData = new FormData();
    formData.append('user_id', authUserId);
    formData.append("likeable_id", id);
    formData.append("likeable_type", type);
  
    const { data } = await like(formData);
    if (!data.success) return false;

    return true;
  } catch (error) {
    console.error(error.response?.data.message);

    return false;
  }
};

export const useGetLikeInfo = async (id, userId) => {
  return api.get(API_ENDPOINTS.LIKE.GET_BY_ID_AND_USER_ID(id, userId));
}