import { ROLE } from "@/constant";

export type User = {
  id: string;
  email: string;
  fullName: string;
  nickname: any;
  description: any;
  country: any;
  phoneNumber: any;
  gender: any;
  address: any;
  avatarUrl: any;
  isPrivate: boolean;
  activated: boolean;
  userRole: ROLE;
};
