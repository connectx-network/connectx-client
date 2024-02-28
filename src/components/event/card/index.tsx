"use client";
import { Icons } from "@/components/icons";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Group,
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

type EventCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  location: string;
  eventDate: string;
};

const EventCard = (props: EventCardProps) => {
  const { id, name, imageUrl, location, eventDate } = props;
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
      withBorder
      className="hover:cursor-pointer hover:opacity-80"
      onClick={() => router.push(`/event/${id}`)}
    >
      <Card.Section
        style={{
          position: "relative",
        }}
      >
        <Image radius={8} src={imageUrl} alt={name} h={170} />
      </Card.Section>

      <Paper className={classes.date}>
        <Text
          variant="gradient"
          gradient={{
            from: "rgba(47, 92, 252, 1)",
            to: "rgba(174, 88, 255, 1)",
            deg: 180,
          }}
          fz={24}
          fw={800}
          ta="center"
        >
          {eventDateFormat.day}
        </Text>
        <Text
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

      <ActionIcon variant="light" size="lg" className={classes.bookmarkIcon}>
        <Icons.bookmarkGradient className="h-5 w-5" />
      </ActionIcon>

      <Stack mt={12} gap={8}>
        <Title c="dark.9" fz={18} lineClamp={2}>
          {name}
        </Title>
        <Flex gap={10} align="center">
          <Avatar.Group>
            <Avatar src="https://www.shutterstock.com/image-vector/cute-cartoon-rubber-duck-vector-600nw-2276837591.jpg" />
            <Avatar src="https://duck-world.com/cdn/shop/collections/Share_a_picture_of_your_duck_in_its_new_home_and_Tag_duck.world.uk_on_Instagram_for_your_chance_to_win_one_of_our_collectibles_36.png?v=1685291022" />
            <Avatar src="https://curatingcambridge.co.uk/cdn/shop/products/CambridgeDuckMarch2023.jpg?v=1679478515" />
          </Avatar.Group>
          <Text c="rgba(63, 56, 221, 1)">+20 Going</Text>
        </Flex>
        <Flex gap={8} align="center">
          <Icons.location />
          <Text c="gray" truncate="end">
            {location}
          </Text>
        </Flex>
      </Stack>
    </Card>
  );
};

export default EventCard;
