"use client";

import { getEventListRequest } from "@/api/event";
import {
  checkFollowedUser,
  followUserRequest,
  getUserRequest,
} from "@/api/user";
import { EventList } from "@/components/event/EventList";
import { Icons } from "@/components/icons";
import { Review } from "@/components/review/ReviewItem";
import { ReviewList } from "@/components/review/ReviewList";
import { InterestList } from "@/components/user/InterestList";
import { COLORS } from "@/constant/color";
import { USER_CONNECTION_TYPES } from "@/constant/user-connection";
import { PaginationResponse } from "@/types/common";
import { EventListResponse } from "@/types/event";
import { User } from "@/types/user";
import { showErrorNotification } from "@/utils";
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
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const [user, setUser] = useState<User>();
  const [joinedEvents, setJoinedEvents] = useState<EventListResponse[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    Promise.all([
      mutationFetchProfile.mutateAsync(params.id),
      mutationCheckFollowedUser.mutateAsync(params.id),
    ]);
    mutationFetchListEventJoined.mutateAsync(params.id);
  }, []);

  const mutationFetchProfile = useMutation({
    mutationFn: async (userId: string) => {
      return await getUserRequest(userId);
    },
    onSuccess: (data: User) => {
      setUser(data);
    },
    onError: (error) => {
      showErrorNotification({
        message: "Failed to fetch user profile",
      });
    },
  });
  const mutationFetchListEventJoined = useMutation({
    mutationFn: async (userId: string) => {
      return await getEventListRequest({
        userId: userId,
      });
    },
    onSuccess: (data: PaginationResponse<EventListResponse>) => {
      setJoinedEvents(data.data);
    },
    onError: (error) => {
      console.log("Error:", error);
    },
  });
  const mutationCheckFollowedUser = useMutation({
    mutationFn: async (targetId: string) => await checkFollowedUser(targetId),
    onSuccess: (data: any) => {
      setIsFollowing(
        data === USER_CONNECTION_TYPES.FOLLOWING ||
          data === USER_CONNECTION_TYPES.FRIEND
      );
    },
    onError: () => {},
  });
  const mutationFollowUser = useMutation({
    mutationFn: async (targetId: string) => await followUserRequest(targetId),
    onSuccess: () => setIsFollowing(true),
    onError: () => {},
  });

  const handleClickFollowUser = () => {
    user?.id && mutationFollowUser.mutateAsync(user?.id);
  };
  return (
    <>
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <Avatar
          color="blue"
          src={user?.avatarUrl}
          alt="User avatar"
          size={"xl"}
          h={96}
          w={96}
        >
          <Icons.camera />
        </Avatar>
        <Title order={2} c="dark" fz={24} className="my-4" my={20}>
          {user?.fullName}
        </Title>
        <Flex gap={16}>
          <Flex align={"center"} justify={"center"} direction={"column"}>
            <Text>{user?.follwing || 0}</Text>
            <Text c="dimmed" fz={14}>
              Following
            </Text>
          </Flex>
          <Divider orientation="vertical" />
          <Flex align={"center"} justify={"center"} direction={"column"}>
            <Text>{user?.follwers || 0}</Text>
            <Text c="dimmed" fz={14}>
              Followers
            </Text>
          </Flex>
        </Flex>
        <Space h="md" />
        <Flex gap={16} justify={"center"} align={"center"}>
          <Button
            leftSection={isFollowing ? <Icons.check /> : <Icons.userPlus />}
            w={154}
            h={50}
            radius={"lg"}
            variant="gradient"
            gradient={{
              from: "rgba(86, 105, 255, 1)",
              to: "rgba(191, 86, 255, 1)",
              deg: 180,
            }}
            onClick={handleClickFollowUser}
          >
            {isFollowing ? "Follwed" : "Follow"}
          </Button>
          <Button
            leftSection={<Icons.messageCircle color={COLORS.PURPLE} />}
            w={154}
            h={50}
            radius={"lg"}
            variant="outline"
            color={COLORS.PURPLE}
          >
            Messages
          </Button>
        </Flex>
        <Space h="md" />

        <Tabs
          defaultValue={"about"}
          color={COLORS.PURPLE}
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
            <Spoiler
              maxHeight={100}
              showLabel="Read More"
              hideLabel="Hide"
              ta={"justify"}
            >
              {user?.description}
            </Spoiler>
            <Space h="lg" />
            <Title order={4} c="dark">
              Interest
            </Title>
            <Space h="md" />
            <div className="flex gap-2 flex-wrap">
              <InterestList
                interests={user?.userInterests || []}
                isEditMode={false}
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="events">
            <EventList events={joinedEvents} />
          </Tabs.Panel>
          <Tabs.Panel value="reviews">
            <ReviewList reviews={MOCK_LIST_REVIEW} />
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </>
  );
}
