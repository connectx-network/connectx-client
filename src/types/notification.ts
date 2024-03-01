import { NOTIFICATION_STATUS, NOTIFICATION_TYPES } from "@/constant/notification";
import { User } from "./user";

export type Notification = {
    id: string,
    senderId: string,
    receiverId: string,
    createdAt: string,
    objectId: string,
    title: string,
    body: string,
    isRead: false,
    status: NOTIFICATION_STATUS,
    notificationType: NOTIFICATION_TYPES,
    sender: User
}
