export type Notification = {
    id: string;
    content: string;
    createdDate: string;
    userIdCreated: string;
    userAvatarCreated: string;
    userFullnameCreated: string;
    isInvite?: boolean;
}