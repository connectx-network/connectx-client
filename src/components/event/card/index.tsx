"use client";
import { Icons } from "@/components/icons";
import {
  ActionIcon,
  Avatar,
  Card,
  Flex,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import classes from "./card.module.css";
import { useMemo } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { ROUTER } from "@/constant";
import { EventCount, JoinedEventUser } from "@/types/event";

type EventCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  joinedUser: JoinedEventUser[];
  count: EventCount;
  shortId: string;
};
const MAX_USER_DISPLAY = 3;

const EventCard = (props: EventCardProps) => {
  const { id, name, imageUrl, location, eventDate, joinedUser, count } = props;
  const router = useRouter();
  const eventDateFormat = useMemo(() => {
    return {
      month: dayjs(eventDate).format("MMMM"),
      day: dayjs(eventDate).format("DD"),
    };
  }, [eventDate]);
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      // withBorder
      className="hover:cursor-pointer hover:opacity-80 card-event-bg-dark"
      onClick={() => router.push(`${ROUTER.EVENT}/${id}`)}
    >
      <Card.Section
        style={{
          position: "relative",
          backgroundColor: "#29313E",
          height: 180,
        }}
      >
        <Image
          component={NextImage}
          radius={8}
          src={imageUrl}
          alt={name}
          fill
          quality={70}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Card.Section>

      <Paper className={classes.date}>
        <Text
          variant="gradient"
          gradient={{
            from: "rgba(47, 92, 252, 1)",
            to: "rgba(174, 88, 255, 1)",
            deg: 180,
          }}
          fz={16}
          fw={800}
          ta="center"
        >
          {eventDateFormat.day}
        </Text>
        <Text
          fz={12}
          variant="gradient"
          gradient={{
            from: "rgba(47, 92, 252, 1)",
            to: "rgba(174, 88, 255, 1)",
            deg: 180,
          }}
          ta="center"
        >
          {eventDateFormat.month}
        </Text>
      </Paper>

      {/* <ActionIcon
        aria-label="Bookmark"
        variant="light"
        size="lg"
        className={classes.bookmarkIcon}
        onClick={(e) => e.stopPropagation()}
      >
        <Icons.bookmarkGradient className="h-5 w-5" />
      </ActionIcon> */}

      <Stack mt={12} gap={8} className="bg-[#29313E]">
        <Title c="white" fz={18} lineClamp={2}>
          {name}
        </Title>
        <Flex gap={10} align="center">
          <Avatar.Group>
            {joinedUser.map((joinUser, index) => {
              if (index > 3) return;
              return (
                <Avatar
                  key={joinUser.user.id}
                  size="sm"
                  src={joinUser.user.avatarUrl}
                  alt={joinUser.user.fullName}
                />
              );
            })}
          </Avatar.Group>
          {count.joinedEventUsers > MAX_USER_DISPLAY ? (
            <Text c="rgba(63, 56, 221, 1)" fz={12}>
              +{count.joinedEventUsers - MAX_USER_DISPLAY} Going
            </Text>
          ) : (
            <Text c="rgba(63, 56, 221, 1)" fz={12}>
              {count.joinedEventUsers} Joined
            </Text>
          )}
        </Flex>
        <Flex gap={8} align="center">
          <Icons.location className="w-4 h-4" />
          <Text c="gray" truncate="end" fz={13} w={"90%"}>
            {location}
          </Text>
        </Flex>
      </Stack>
    </Card>
  );
};

export default EventCard;
