import { API_URLS } from "./apiUrls";
import { apiService } from "../utils/api.service";

const storeComment = (data = {}) => {
    apiService.post(API_URLS.STORE_COMMENTS , data);
}

export const commentService =  {
    storeComment,
}