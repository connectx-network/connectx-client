import { create } from "zustand";
import { EventListParam } from "@/types/event";

type EventListParamState = {
  param: EventListParam;
  setEventQuery: (param: EventListParam) => void;
};

const initialEventListParam: EventListParam = {
  page: 1,
  size: 10,
};

export const useEventListParamStore = create<EventListParamState>()((set) => ({
  param: initialEventListParam,
  setEventQuery: (param: EventListParam) => set((prev) => ({ ...prev, param })),
}));
