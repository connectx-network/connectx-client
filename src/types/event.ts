import { PaginationParam } from "./common";

export type EventListParam = PaginationParam;

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
};

export type EventDetail = {
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
  eventCategory: EventCategory;
  eventAssets: EventAsset[];
  eventHosts: EventHost[];
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
