import { Card, Flex, Image, Text } from "@mantine/core";
import dayjs from "dayjs";

export interface EventItemProps {
  event: Event;
}

export interface Event {
  name?: string | undefined;
  eventCategoryId?: string | undefined;
  tiketPrice?: number | undefined;
  eventDate?: string | undefined;
  location?: string | undefined;
  description?: string | undefined;
  sponsors?: string | undefined;
  agenda?: string | undefined;
  speakers?: string | undefined;
  createEventHostDto?: [
    {
      title?: string | undefined;
      url?: string | undefined;
    }
  ];
  createEventAssetDto?: [
    {
      url: string | undefined;
      type: "BACKGROUND";
    }
  ];
}
export const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <Card withBorder shadow="sm" radius={"lg"} key={event.eventCategoryId}>
      <Flex gap={16}>
        <Image
          radius={"lg"}
          src={event?.createEventAssetDto?.[0]?.url}
          w={79}
        />
        <div>
          <Text fz={12} c="#5669FF">
            {dayjs(event.eventDate).format("HH/DD/MM/YY")}
          </Text>
          <Text fz={18}>{event.name}</Text>
        </div>
      </Flex>
    </Card>
  );
};
