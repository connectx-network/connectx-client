import { ROLE } from "@/constant/role"

export type User = {
    id: string,
    email: string,
    fullName: string,
    nickname: string,
    description?: string,
    country: string,
    phoneNumber: string,
    gender: string,
    address: string,
    avatarUrl: string,
    isPrivate: boolean,
    activated: boolean,
    userRole: ROLE,
    userInterests: UserInterest[],
    follwers?: number,
    follwing?: number,
}
export type UpdateUserBody = {
    fullName: string,
    nickname: string,
    phoneNumber: string,
    country: string,
    address: string,
    gender: string
}
export type UserInterest = {
    id?: string,
    name: string
}