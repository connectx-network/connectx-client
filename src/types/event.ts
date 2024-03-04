import { PaginationParam } from "./common";
import { User } from "./user";

export type EventListParam = PaginationParam & {
  userId?: string;
};

export type JoinedUserEventParam = PaginationParam & {
  eventId: string;
};

export type EventListResponse = {
  id: string;
  name: string;
  tiketPrice: any;
  createdAt: string;
  eventDate: string;
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
  _count: EventCount;
};

export type EventCategory = {
  id: string;
  name: string;
};

export type EventAsset = {
  id: string;
  url: string;
  type: string;
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
