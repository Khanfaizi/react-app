import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const getPosts = () => apiService.get(API_URLS.GET_POST);

const getPostById = (postId) => apiService.get(`${API_URLS.GET_POST}/${postId}`)

export const postService = {
    getPosts,
    getPostById,
};