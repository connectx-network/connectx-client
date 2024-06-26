import { PaginationParam } from "./common";
import { User } from "./user";

export type EventListParam = PaginationParam & {
  userId?: string;
};

export type JoinedUserEventParam = PaginationParam & {
  eventId: string;
};

export enum EventType {
  READONLY = "READONLY",
  NORMAL = "NORMAL",
}

export type EventListResponse = {
  id: string;
  name: string;
  tiketPrice: any;
  createdAt: string;
  eventDate: string;
  eventEndDate: string;
  location: string;
  description: string;
  sponsors: any;
  agenda: any;
  speakers: any;
  eventCategoryId: string;
  eventAssets: EventAsset[];
  eventHosts: EventHost[];
  joinedEventUsers: JoinedEventUser[];
  eventLocationDetail: EventLocationDetail;
  _count: EventCount;
  shortId: string;
};

export type EventDetail = {
  id: string;
  name: string;
  tiketPrice: any;
  createdAt: string;
  eventDate: string;
  eventEndDate: string;
  location: string;
  description: string;
  sponsors: any;
  agenda: any;
  speakers: any;
  eventCategoryId: string;
  eventCategory: EventCategory;
  eventAssets: EventAsset[];
  eventHosts: EventHost[];
  joinedEventUsers: JoinedEventUser[];
  eventPhases: EventPhases[];
  eventLinks: EventLinks[];
  _count: EventCount;
  eventType: EventType;
  registUrl: string;
};

export type EventCategory = {
  id: string;
  name: string;
};

export enum EventAssetType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  BACKGROUND = "BACKGROUND",
}

export type EventAsset = {
  id: string;
  url: string;
  type: EventAssetType;
  eventId: string;
};

export type EventHost = {
  id: string;
  title: string;
  url: string;
  eventId: string;
};

export type EventLocationDetail = {
  id: string;
  latitude: string;
  longitude: string;
  eventId: string;
};

export type JoinedEventUser = {
  id: string;
  eventId: string;
  userId: string;
  joinDate: string;
  checkInDate: any;
  checkedIn: boolean;
  user: Pick<User, "id" | "fullName" | "nickname" | "avatarUrl">;
};

export type EventCount = {
  joinedEventUsers: number;
  eventHosts: number;
  eventAssets: number;
};

export type CheckJoinedEventResponse = {
  joined: boolean;
};

export type EventPhases = {
  id: string;
  title: string;
  description: string;
  order: number;
  eventId: string;
};

export type EventLinks = {
  id: string;
  title: string;
  url: string;
  eventId: string;
};

export type EventContactBody = {
  email: string;
  fullName: string;
  company: string;
  jobTitle: string;
  eventId: string;
  knowEventBy: string;
  linkedInUrl: string;
  companyUrl: string;
  telegramId: string;
};

export enum EventStatus {
  UPCOMING = "UPCOMING",
  ONGOING = "ONGOING",
  ENDED = "ENDED",
}
