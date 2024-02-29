"use client";

import { Icons } from "@/components/icons";
import { QUERY_KEY } from "@/constant/query-key";
import {
  ActionIcon,
  Avatar,
  Button,
  Checkbox,
  Drawer,
  Flex,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

export interface Root {
  results: Result[];
  info: Info;
}

export interface Result {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: any;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Street {
  number: number;
  name: string;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface Dob {
  date: string;
  age: number;
}

export interface Registered {
  date: string;
  age: number;
}

export interface Id {
  name: string;
  value?: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

const EventInvite = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: friendListData } = useQuery({
    queryKey: [QUERY_KEY.GET_FRIEND_LIST],
    queryFn: () => {
      return fetch("https://randomuser.me/api/?results=30")
        .then((res) => res.json())
        .then((res) => res.results as Result[]);
    },
  });

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title={
          <Text fz={24} fw={500}>
            Invite Friend
          </Text>
        }
        styles={{
          body: {
            height: "calc(100% - 70px)",
            position: "relative",
          },
        }}
      >
        <TextInput
          radius="xl"
          size="md"
          placeholder="Search"
          rightSectionWidth={42}
          leftSection={
            <IconSearch
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              variant="filled"
              color="rgba(86, 105, 255, 1)"
            >
              <IconArrowRight
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          }
        />

        <ScrollArea
          style={{
            height: "calc(100% - 70px)",
          }}
        >
          <Stack gap={16} p={20}>
            {friendListData?.map((friend, index) => (
              <Flex key={index} justify="space-between" align="center">
                <Flex gap={12} align="center">
                  <Avatar
                    src={friend.picture.thumbnail}
                    alt={friend.name.first + " " + friend.name.last}
                    size={45}
                    radius="xl"
                  />
                  <Stack gap={2}>
                    <Text fz={14}>
                      {friend.name.first + " " + friend.name.last}
                    </Text>
                    <Text fz={13} c="gray">
                      {friend.location.street.number} Followers
                    </Text>
                  </Stack>
                </Flex>
                <Checkbox
                  defaultChecked
                  color="rgba(86, 105, 255, 1)"
                  size="md"
                  styles={{
                    input: {
                      borderRadius: 50,
                    },
                  }}
                />
              </Flex>
            ))}
          </Stack>
        </ScrollArea>
        <Button
          type="submit"
          h={58}
          w="50%"
          radius={12}
          mt={12}
          variant="gradient"
          gradient={{
            from: "rgba(86, 105, 255, 1)",
            to: "rgba(191, 86, 255, 1)",
            deg: 180,
          }}
          justify="space-between"
          leftSection={<span />}
          rightSection={<Icons.rightArrow />}
          styles={{
            label: {
              fontSize: "16px",
            },
          }}
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          INVITE
        </Button>
      </Drawer>

      <Button
        size="compact-sm"
        variant="gradient"
        gradient={{
          from: "rgba(86, 105, 255, 1)",
          to: "rgba(191, 86, 255, 1)",
          deg: 180,
        }}
        px={8}
        radius={10}
        onClick={open}
      >
        <Text fz={10} c="rbga(255, 255, 255, 1)">
          Invite
        </Text>
      </Button>
    </>
  );
};

export default EventInvite;
