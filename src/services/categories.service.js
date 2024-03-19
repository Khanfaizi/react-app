import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const getCategory = () => {
    return apiService.get(API_URLS.GET_CATEGORY)
};

export const CategoryService = {
    getCategory,
}