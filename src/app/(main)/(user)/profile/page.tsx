"use client";

import { getUserRequest, updateUserRequest } from "@/api/user";
import { Icons } from "@/components/icons";
import { TOKEN_KEY } from "@/constant";
import { COLORS } from "@/constant/color";
import { ROUTER } from "@/constant/router";
import { UpdateUserBody, User, UserInterest } from "@/types/user";
import { showErrorNotification, showSuccessNotification } from "@/utils";
import {
  Avatar,
  Button,
  Flex,
  Space,
  Spoiler,
  Tabs,
  Textarea,
  Title,
  Text,
  Divider,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InterestList } from "@/components/user/InterestList";
import { useAuthStore } from "@/store/auth.store";
import { EventList } from "@/components/event/EventList";
import { ReviewList } from "@/components/review/ReviewList";
import { getEventListRequest } from "@/api/event";
import { PaginationResponse } from "@/types/common";
import { EventListResponse } from "@/types/event";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<User>();
  const [editDescriptionMode, setEditDescriptionMode] = useState(false);
  const [editInterestMode, setEditInterestMode] = useState(false);
  const [description, setDescription] = useState<string>();
  const [interests, setInterests] = useState<UserInterest[]>([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuthStore();
  const [joinedEvents, setJoinedEvents] = useState<EventListResponse[]>([]);

  useEffect(() => {
    const userId = auth.user?.id || "";
    if (userId) {
      mutationFetchProfile.mutateAsync(userId);
      mutationFetchListEventJoined.mutateAsync(userId);
    }
  }, [auth]);

  const mutationFetchProfile = useMutation({
    mutationFn: async (userId: string) => {
      return await getUserRequest(userId);
    },
    onSuccess: (data: User) => {
      setUserProfile(data);
      setDescription(data.description);
      setInterests(data.userInterests);
    },
    onError: (error) => {
      showErrorNotification({
        message: "Failed to fetch user profile",
      });
    },
  });

  const mutationEditProfile = useMutation({
    mutationFn: async (body: UpdateUserBody) => {
      return await updateUserRequest(body);
    },
    onSuccess: (data: User) => {
      setLoading(false);
      showSuccessNotification({
        message: "Edit profile successfully",
      });
    },
    onError: (error) => {
      setLoading(false);
      showErrorNotification({
        message: "Edit profile failed",
      });
    },
  });

  const handleClickChangeDescription = () => {
    // Only call API if user edit description
    if (editDescriptionMode && description !== userProfile?.description) {
      const body = {
        description,
      };
      mutationEditProfile.mutateAsync(body as any);
      setUserProfile({ ...userProfile, description: description } as any);
    }
    setEditDescriptionMode(!editDescriptionMode);
  };

  const handleClickChangeInterests = () => {
    if (editInterestMode) {
      const body = {
        interests,
      };
      mutationEditProfile.mutateAsync(body as any);
    }
    setEditInterestMode(!editInterestMode);
  };

  const handleChangeNameInterest = (index: number, value: string) => {
    setInterests([
      ...interests.slice(0, index),
      { name: value, id: interests[index].id },
      ...interests.slice(index + 1),
    ]);
  };

  const handleAddNewInterest = (name: string) => {
    setInterests([...interests, { name: name }]);
  };

  const handleRemoveInterest = (index: number) => {
    setInterests([...interests.slice(0, index), ...interests.slice(index + 1)]);
  };

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

  return (
    <>
      <Title order={2} fz={24}>
        Profile
      </Title>
      <div className="flex justify-center items-center flex-col">
        <Avatar
          color="blue"
          src={userProfile?.avatarUrl}
          alt="User avatar"
          size={"xl"}
          h={96}
          w={96}
        >
          <Icons.camera />
        </Avatar>

        <Title order={2} fz={24} mt={20}>
          {userProfile?.fullName}
        </Title>
        {userProfile?.company && (
          <Flex my={8}>
            <Icons.workplace />
            <Title order={4}>{userProfile?.company}</Title>
          </Flex>
        )}

        <Flex gap={16}>
          <Flex align={"center"} justify={"center"} direction={"column"}>
            <Text>{userProfile?.following || 0}</Text>
            <Text c="dimmed" fz={14}>
              Following
            </Text>
          </Flex>
          <Divider orientation="vertical" />
          <Flex align={"center"} justify={"center"} direction={"column"}>
            <Text>{userProfile?.followers || 0}</Text>
            <Text c="dimmed" fz={14}>
              Followers
            </Text>
          </Flex>
        </Flex>
        <Space h={"md"} />
        <Link href={ROUTER.EDIT_PROFILE}>
          <Button
            leftSection={<Icons.edit />}
            variant="outline"
            color={COLORS.PURPLE}
            radius={"md"}
            fw={"revert"}
          >
            Edit Profile
          </Button>
        </Link>
        <Space h={"md"} />
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
            <div className="w-full">
              <div className="flex justify-between items-center my-4">
                <Title order={4} c="dark">
                  About me
                </Title>
                <Button
                  leftSection={<Icons.edit3 />}
                  variant="light"
                  color={COLORS.PURPLE}
                  size="sm"
                  radius="xl"
                  fw={"revert"}
                  onClick={handleClickChangeDescription}
                  w={110}
                >
                  {editDescriptionMode ? "Save" : "Change"}
                </Button>
              </div>
              {editDescriptionMode ? (
                <Textarea
                  autosize
                  minRows={5}
                  value={description}
                  onChange={(event) =>
                    setDescription(event.currentTarget.value)
                  }
                />
              ) : (
                <Spoiler
                  maxHeight={100}
                  showLabel="Read More"
                  hideLabel="Hide"
                  ta={"justify"}
                  className="whitespace-break-spaces"
                >
                  {userProfile?.description}
                </Spoiler>
              )}

              <div className="flex justify-between items-center my-4">
                <Title order={4} c="dark">
                  Interest
                </Title>
                <Button
                  leftSection={<Icons.edit3 />}
                  variant="light"
                  color={COLORS.PURPLE}
                  size="sm"
                  radius="xl"
                  fw={"revert"}
                  onClick={handleClickChangeInterests}
                  w={110}
                >
                  {editInterestMode ? "Save" : "Change"}
                </Button>
              </div>
              <Flex gap={8}>
                <InterestList
                  interests={interests}
                  isEditMode={editInterestMode}
                  updateNameInterest={handleChangeNameInterest}
                  addNewInterest={handleAddNewInterest}
                  removeInterest={handleRemoveInterest}
                />
              </Flex>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="events">
            <EventList events={joinedEvents} />
          </Tabs.Panel>
          <Tabs.Panel value="reviews">
            <ReviewList reviews={[]} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
}
