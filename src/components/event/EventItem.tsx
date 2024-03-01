import { EventListResponse } from "@/types/event";
import { Card, Flex, Image, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Icons } from "../icons";
import { COLORS } from "@/constant/color";

export interface EventItemProps {
  event: EventListResponse;
}

export const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <Card withBorder shadow="sm" radius={"lg"} key={event.eventCategoryId}>
      <Flex gap={16}>
        <Image
          radius={"lg"}
          src={event?.eventAssets?.[0]?.url}
          w={90}
          h={100}
          alt="Image"
        />
        <Flex direction={"column"} justify={"space-between"}>
          <div>
            <Text fz={12} c={COLORS.PURPLE}>
              {dayjs(event.eventDate).format("HH:mm A - DD MMM YYYY")}
            </Text>
            <Text fz={18}>{event.name}</Text>
          </div>
          <Flex gap={8} align="center">
            <Icons.location />
            <Text c="gray" fz={14} lineClamp={1}>
              {event.location}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
