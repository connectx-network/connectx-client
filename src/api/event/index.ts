import axiosInstance from "@/utils/axios";
import { objectToQueryStringByComma } from "@/utils/query";
import { PaginationResponse } from "@/types/common";
import {
  CheckJoinedEventResponse,
  EventDetail,
  EventListParam,
  EventListResponse,
  JoinedUserEventParam,
} from "@/types/event";
import { UserJoinedEvent } from "@/types/user";

export const getEventListRequest = async (
  param: EventListParam
): Promise<PaginationResponse<EventListResponse>> => {
  const query = objectToQueryStringByComma(param);
  const { data } = await axiosInstance.get(`/event?${query}`);
  return data;
};

export const getEventDetailRequest = async (
  id: string
): Promise<EventDetail> => {
  const { data } = await axiosInstance.get(`/event/${id}`);
  return data;
};

export const getJoinedUserEventRequest = async (
  param: JoinedUserEventParam
): Promise<PaginationResponse<{ user: UserJoinedEvent }>> => {
  const query = objectToQueryStringByComma(param);
  const { data } = await axiosInstance.get(`/event/joined-user?${query}`);
  return data;
};

export const joinEventRequest = async (eventId: string) => {
  await axiosInstance.post(`/event/join/${eventId}`);
};

export const checkJoinedEventRequest = async (
  eventId: string
): Promise<CheckJoinedEventResponse> => {
  const { data } = await axiosInstance.get(`/event/check-join/${eventId}`);
  return data;
};
