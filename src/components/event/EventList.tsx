import { Space, Text } from "@mantine/core";
import { EventItem } from "./EventItem";
import { EventListResponse } from "@/types/event";

export interface EventListProps {
  events: EventListResponse[];
}
export const EventList = ({ events }: EventListProps) => {
  if (!events || events.length === 0) {
    return <Text>No data found</Text>;
  }
  return events?.map((event) => {
    return (
      <>
        <EventItem event={event} />
        <Space h={"lg"} />
      </>
    );
  });
};
