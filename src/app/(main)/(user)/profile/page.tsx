"use client";
import { Icons } from "@/components/icons";
import { ROUTER } from "@/constant/router";
import { Avatar, Button, Spoiler, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState({
    name: "Jonny Deep",
    avatarUrl: "",
    aboutMe:
      "Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase. Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.",
    interests: [
      { value: "Games online", color: "red" },
      { value: "Conchert", color: "yellow" },
      { value: "Music", color: "orange" },
      { value: "Art", color: "green" },
      { value: "Movie", color: "" },
      { value: "Others", color: "" },
    ],
  });

  const PURPLE_COLOR = "#5669FF";

  return (
    <>
      <Title order={2} c="dark" fz={24}>
        Profile
      </Title>
      <div className="flex justify-center items-center flex-col">
        <Avatar
          color="blue"
          src={userProfile.avatarUrl}
          alt="User avatar"
          size={"xl"}
          h={96}
          w={96}
        >
          <Icons.camera />
        </Avatar>

        <Title order={2} c="dark" fz={24} className="my-4" my={20}>
          {userProfile.name}
        </Title>
        <Link href={ROUTER.EDIT_PROFILE}>
          <Button
            leftSection={<Icons.edit />}
            variant="outline"
            color={PURPLE_COLOR}
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
              color={PURPLE_COLOR}
              size="sm"
              radius="xl"
              fw={"revert"}
            >
              CHANGE
            </Button>
          </div>
          <Spoiler maxHeight={100} showLabel="Read More" hideLabel="Hide">
            {userProfile.aboutMe}{" "}
          </Spoiler>
          <div className="flex justify-between items-center my-4">
            <Title order={4} c="dark">
              Interest
            </Title>
            <Button
              leftSection={<Icons.edit3 />}
              variant="light"
              color={PURPLE_COLOR}
              size="sm"
              radius="xl"
              fw={"revert"}
            >
              CHANGE
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {userProfile?.interests?.map((e, index) => (
              <Button
                key={index}
                variant="filled"
                color={e.color}
                radius={"xl"}
                size="xs"
              >
                {e.value}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
