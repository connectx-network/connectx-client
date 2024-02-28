import axiosInstance from "@/utils/axios";
import { objectToQueryStringByComma } from "@/utils/query";
import { PaginationResponse } from "@/types/common";
import { EventDetail, EventListParam, EventListResponse } from "@/types/event";

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
