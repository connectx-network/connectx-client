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