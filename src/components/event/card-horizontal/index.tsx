"use client";
import { useMemo } from "react";
import {
  AspectRatio,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useComputedColorScheme,
} from "@mantine/core";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { Icons } from "@/components/icons";
import classes from "./card-horizontal.module.css";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/constant";
import { COLORS } from "@/constant/color";

dayjs.extend(LocalizedFormat);

type CardEventHorizontalProps = {
  event: {
    id: string;
    name: string;
    date: string;
    imageUrl: string;
    location: string;
  };
};

const CardEventHorizontal = (props: CardEventHorizontalProps) => {
  const { event } = props;
  const router = useRouter();
  const eventDate = useMemo(() => {
    if (!event.date) return "";
    return dayjs(event.date).format("LT - DD/MM/YYYY");
  }, [event.date]);

  const computedColorScheme = useComputedColorScheme();
  const isDarkMode = computedColorScheme === "dark";

  return (
    <Flex
      className={classes.wrapper}
      gap={4}
      style={{
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        background: isDarkMode ? "#29313E" : "white",
      }}
      onClick={() => router.push(`${ROUTER.EVENT}/${event.id}`)}
    >
      <Image
        src={event.imageUrl}
        alt={event.name}
        w="40%"
        h="180px"
        radius={8}
        style={{
          flex: "0 1 auto",
        }}
      />
      <Flex
        direction="column"
        justify="space-between"
        align="flex-start"
        gap={20}
        p={20}
        h={{
          base: 180,
        }}
      >
        <Stack gap={4}>
          <Text c={COLORS.PURPLE}>{eventDate}</Text>
          <Title order={5} lineClamp={2}>
            {event.name}
          </Title>
        </Stack>
        <Flex gap={8} align="center">
          <Icons.location />
          <Text c="gray" fz={12} lineClamp={1}>
            {event.location}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardEventHorizontal;
