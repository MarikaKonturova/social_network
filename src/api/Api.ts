import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': "9eb46dcc-1fbf-46b5-86df-7c031d84dc43"
    }
});
export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`);
    },
    follow(id: number) {
        return instance.post(`/follow/${id}`);
    },
    unfollow(id: number) {
        return instance.delete(`/follow/${id}`);
    },
    getUserProfile(userId: number) {
        return profileAPI.getUserProfile(userId);
    }
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`/profile/${userId}`)
    },
    getUserStatus(userId: number) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`/profile/status`, {status})
    },
}
export const authAPI = {
    me() {
        return instance.get(`/auth/me`)
    },
    login(data: LoginDataRequestType){
        return instance.post(`/auth/login`, data)
    },
    logout(){
        return instance.delete(`/auth/login`)
    }
}
export type LoginDataRequestType={
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}





