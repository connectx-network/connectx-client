"use client";

import { getUserRequest, updateUserRequest } from "@/api/user";
import { Icons } from "@/components/icons";
import { TOKEN_KEY } from "@/constant";
import { COLORS } from "@/constant/color";
import { ROUTER } from "@/constant/router";
import { UpdateUserBody, User, UserInterest } from "@/types/user";
import {
  getToken,
  showErrorNotification,
  showSuccessNotification,
} from "@/utils";
import { Avatar, Button, Flex, Spoiler, Textarea, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InterestList } from "@/components/user/InterestList";
import { useAuthStore } from "@/store/auth.store";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<User>();
  const [editDescriptionMode, setEditDescriptionMode] = useState(false);
  const [editInterestMode, setEditInterestMode] = useState(false);
  const [description, setDescription] = useState<string>();
  const [interests, setInterests] = useState<UserInterest[]>([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuthStore();

  useEffect(() => {
    const userId = auth.user?.id || "";
    if (userId) {
      mutationFetchProfile.mutateAsync(userId);
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

  return (
    <>
      <Title order={2} c="dark" fz={24}>
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

        <Title order={2} c="dark" fz={24} className="my-4" my={20}>
          {userProfile?.fullName}
        </Title>
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

        <div className="w-full mt-11 md:w-3/4 lg:w-1/2">
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
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
          ) : (
            <Spoiler
              maxHeight={100}
              showLabel="Read More"
              hideLabel="Hide"
              ta={"justify"}
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
      </div>
    </>
  );
}
