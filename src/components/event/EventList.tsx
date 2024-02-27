import { Space } from "@mantine/core";
import { EventItem, Event } from "./EventItem";

export interface EventListProps {
  events: Event[];
}
export const EventList = ({ events }: EventListProps) => {
  return events?.map((event) => {
    return (
      <>
        <EventItem event={event} />
        <Space h={"lg"} />
      </>
    );
  });
};
