import { apiService } from "../utils/api.service";
import { API_URLS } from "./apiUrls";

const register = (data) => {
    return apiService.post(API_URLS.REGISTER,data)
}
const login = (data) => {
    return apiService.post(API_URLS.LOGIN,data)
}

const getUser = () => {
    return apiService.get(API_URLS.USERS)
};

export const userService = {
    register,
    login,
    getUser,
}