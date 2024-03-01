import { UpdateUserBody, User } from "@/types/user";
import axiosInstance from "@/utils/axios"

export const getUserRequest = async (id: string | null) => {
    const { data } = await axiosInstance.get<User>(`/user/${id}`);
    return data;
}

export const updateUserRequest = async (body: UpdateUserBody) => {
    const { data } = await axiosInstance.put<User>("/user", body);
    return data;
}

export const uploadUserAvatar = async (form: FormData) => {
    const { data } = await axiosInstance.patch("user/avatar", form);
    return data;
}

export const followUserRequest = async (targetId: string) => {
    const { data } = await axiosInstance.post(`user-connection/${targetId}`, {});
    return data;
}

export const checkFollowedUser = async (targetId: string) => {
    const { data } = await axiosInstance.get(`user-connection/relation/${targetId}`);
    return data;
} 