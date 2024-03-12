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
import NextImage from "next/image";

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
    shortId: string;
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
    <div
      className={`${classes.wrapper} grid grid-cols-5`}
      style={{
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        background: isDarkMode ? "#29313E" : "white",
      }}
      onClick={() => router.push(`${ROUTER.EVENT}/${event.shortId}`)}
    >
      <div className="relative h-[180px] col-span-2 ">
        <Image
          component={NextImage}
          src={event.imageUrl}
          alt={event.name}
          fill
          quality={70}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          radius={8}
        />
      </div>
      <Flex
        className="col-span-3"
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
          <Text c="gray" fz={12} lineClamp={1} w={"90%"}>
            {event.location}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default CardEventHorizontal;
