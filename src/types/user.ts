import { ROLE } from "@/constant/role";

export type User = {
  id: string;
  email: string;
  fullName: string;
  nickname: string;
  description?: string;
  country: string;
  phoneNumber: string;
  gender: string;
  address: string;
  avatarUrl: string;
  isPrivate: boolean;
  activated: boolean;
  userRole: ROLE;
  userInterests: UserInterest[];
  followers?: number;
  following?: number;
};

export type UpdateUserBody = {
  fullName: string;
  nickname: string;
  phoneNumber: string;
  country: string;
  address: string;
  gender: string;
};

export type UserInterest = {
  id?: string;
  name: string;
};

export type UserJoinedEvent = User & {
  _count: UserCount;
};

export type UserCount = {
  userImages: number;
  userInterests: number;
  following: number;
  followers: number;
  joinedEventUsers: number;
  userTokens: number;
  sentNotifications: number;
  receivedNotifications: number;
};
