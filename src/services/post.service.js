import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const getPosts = () => apiService.get(API_URLS.GET_POST);

export const postService = {
    getPosts,
};