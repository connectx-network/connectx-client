import { EventListResponse } from "@/types/event";
import { Card, Flex, Image, Text, useComputedColorScheme } from "@mantine/core";
import dayjs from "dayjs";
import { Icons } from "../icons";
import { COLORS } from "@/constant/color";
import cx from "clsx";
import Link from "next/link";
import { ROUTER } from "@/constant";
export interface EventItemProps {
  event: EventListResponse;
}

export const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const computedColorScheme = useComputedColorScheme();

  return (
    <Card
      // withBorder
      shadow="sm"
      radius={"lg"}
      style={{
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      }}
      key={event.eventCategoryId}
      className={cx([
        computedColorScheme === "dark" ? "card-event-bg-dark" : "bg-white",
      ])}
    >
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
            <Text fz={12} c="blue">
              {dayjs(event.eventDate).format("HH:mm A - DD MMM YYYY")}
            </Text>
            <Link href={`${ROUTER.EVENT}/${event.shortId}`}>
              <Text
                c={computedColorScheme === "dark" ? "white" : "black"}
                fz={18}
                lineClamp={2}
              >
                {event.name}
              </Text>
            </Link>
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
