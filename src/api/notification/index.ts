import { PaginationResponse } from "@/types/common";
import { Notification } from "@/types/notification"
import axiosInstance from "@/utils/axios"

export const getNotifications = async (): Promise<PaginationResponse<Notification>> => {
    const { data } = await axiosInstance.get('/notification');
    return data;
}

// export const sendNotification = async (body: SendNotificationDto) => {
//     const { data } = await axiosInstance.post<Notification>('/notification');
//     return data;
// }