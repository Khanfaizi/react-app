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

const deleteUserById = (userId) => {
    return apiService.delete(`${API_URLS.USERS}/${userId}`)
}

export const userService = {
    register,
    login,
    getUser,
    deleteUserById
}