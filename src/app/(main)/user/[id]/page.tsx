"use client";

import { Event } from "@/components/event/EventItem";
import { EventList } from "@/components/event/EventList";
import { Icons } from "@/components/icons";
import { Review } from "@/components/review/ReviewItem";
import { ReviewList } from "@/components/review/ReviewList";
import { InterestList } from "@/components/user/InterestList";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Text,
  Title,
  Space,
  Tabs,
  Spoiler,
} from "@mantine/core";
import { useState } from "react";

const MOCK_LIST_EVENT: Event[] = [
  {
    name: "Name of event",
    eventCategoryId: "string",
    tiketPrice: 0,
    eventDate: "2024-02-27T08:22:10.856Z",
    location: "string",
    description: "string",
    sponsors: "string",
    agenda: "string",
    speakers: "string",
    createEventHostDto: [
      {
        title: "string",
        url: "string",
      },
    ],
    createEventAssetDto: [
      {
        url: "https://picsum.photos/200",
        type: "BACKGROUND",
      },
    ],
  },
  {
    name: "Name of event 4",
    eventCategoryId: "stringeqweqweqw",
    tiketPrice: 0,
    eventDate: "2024-02-27T08:22:10.856Z",
    location: "string",
    description: "string",
    sponsors: "string",
    agenda: "string",
    speakers: "string",
    createEventHostDto: [
      {
        title: "string",
        url: "string",
      },
    ],
    createEventAssetDto: [
      {
        url: "https://picsum.photos/200",
        type: "BACKGROUND",
      },
    ],
  },
  {
    name: "Name of event 2",
    eventCategoryId: "stringdasda",
    tiketPrice: 0,
    eventDate: "2024-02-27T08:22:10.856Z",
    location: "string",
    description: "string",
    sponsors: "string",
    agenda: "string",
    speakers: "string",
    createEventHostDto: [
      {
        title: "string",
        url: "string",
      },
    ],
    createEventAssetDto: [
      {
        url: "https://picsum.photos/200",
        type: "BACKGROUND",
      },
    ],
  },
];
const MOCK_LIST_REVIEW: Review[] = [
  {
    image: "https://picsum.photos/200",
    name: "Jonny Deep A",
    rate: 3,
    contentReview:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "2024-02-27T08:22:10.856Z",
  },
  {
    image: "https://picsum.photos/200",
    name: "Jonny Deep B",
    rate: 5,
    contentReview:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "2024-02-27T08:22:10.856Z",
  },
];
export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState({
    name: "Jonny Deep",
    avatarUrl: "",
    aboutMe:
      "Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.",
    interests: [],
  });

  return (
    <>
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <Avatar
          color="blue"
          src={""}
          alt="User avatar"
          size={"xl"}
          h={96}
          w={96}
        >
          <Icons.camera />
        </Avatar>
        <Title order={2} c="dark" fz={24} className="my-4" my={20}>
          Jonny Deep
        </Title>
        <Flex gap={16}>
          <Flex align={"center"} justify={"center"} direction={"column"}>
            <Text>350</Text>
            <Text c="dimmed" fz={14}>
              Following
            </Text>
          </Flex>
          <Divider orientation="vertical" />
          <Flex align={"center"} justify={"center"} direction={"column"}>
            <Text>350</Text>
            <Text c="dimmed" fz={14}>
              Followers
            </Text>
          </Flex>
        </Flex>
        <Space h="md" />
        <Flex gap={16} justify={"center"} align={"center"}>
          <Button
            leftSection={<Icons.userPlus />}
            w={154}
            h={50}
            radius={"lg"}
            variant="gradient"
            gradient={{
              from: "rgba(86, 105, 255, 1)",
              to: "rgba(191, 86, 255, 1)",
              deg: 180,
            }}
          >
            Follow
          </Button>
          <Button
            leftSection={<Icons.messageCircle />}
            w={154}
            h={50}
            radius={"lg"}
            variant="outline"
            color="#5669FF"
          >
            Messages
          </Button>
        </Flex>
        <Space h="md" />

        <Tabs
          defaultValue={"about"}
          color="#5669FF"
          className="w-full md:w-3/4 lg:w-1/2"
          styles={{
            tabLabel: { fontSize: 16, fontWeight: 500, color: "#747688" },
          }}
        >
          <Tabs.List justify="space-between">
            <Tabs.Tab value="about">ABOUT</Tabs.Tab>
            <Tabs.Tab value="events">EVENTS</Tabs.Tab>
            <Tabs.Tab value="reviews">REVIEWS</Tabs.Tab>
          </Tabs.List>
          <Space h="md" />

          <Tabs.Panel value="about">
            <Spoiler maxHeight={100} showLabel="Read More" hideLabel="Hide">
              {user.aboutMe}
            </Spoiler>
            <Space h="lg" />
            <Title order={4} c="dark">
              Interest
            </Title>
            <Space h="md" />
            <div className="flex gap-2 flex-wrap">
              <InterestList
                interests={user?.interests || []}
                isEditMode={false}
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="events">
            <EventList events={MOCK_LIST_EVENT} />
          </Tabs.Panel>
          <Tabs.Panel value="reviews">
            <ReviewList reviews={MOCK_LIST_REVIEW} />
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </>
  );
}
