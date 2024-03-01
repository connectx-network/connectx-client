import { User } from "./user"

export type Message = {
    id: string,
    senderId: string,
    receiverId: string,
    createdAt: string,
    objectId: string,
    title: string,
    body: string,
    isRead: false,
    sender: User
}