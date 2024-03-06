"use client";

import { getJoinedUserEventRequest } from "@/api/event";
import { Icons } from "@/components/icons";
import { ROUTER } from "@/constant";
import { COLORS } from "@/constant/color";
import { QUERY_KEY } from "@/constant/query-key";
import { useAuthStore } from "@/store/auth.store";
import { JoinedUserEventParam } from "@/types/event";
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
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type EventInviteProps = {
  eventId: string;
};

const EventInvite = (props: EventInviteProps) => {
  const { eventId } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const { auth } = useAuthStore();
  const computedColor = useComputedColorScheme();
  const isDarkMode = computedColor === "dark";
  const [userList, setUserList] = useState<string[]>([]);
  /**
   * TODO
   * Change size to 10 and handle load more later
   */
  const [joinedUserParam, setJoinedUserParam] = useState<JoinedUserEventParam>({
    page: 1,
    size: 1000,
    eventId,
  });

  const { data: joinedEventUserData } = useQuery({
    queryKey: [QUERY_KEY.GET_JOINED_USER_EVENT_LIST, joinedUserParam],
    queryFn: () => getJoinedUserEventRequest(joinedUserParam),
  });

  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title={
          <Text fz={24} fw={500}>
            List joined event
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
          value={searchInput}
          onChange={(event) => setSearchInput(event.currentTarget.value)}
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
          {/* <Checkbox.Group value={userList} onChange={setUserList}> */}
          <Stack gap={16} p={20}>
            {joinedEventUserData?.data
              .filter(
                (item) =>
                  item.user.id !== auth?.user?.id &&
                  (!searchInput ||
                    (searchInput &&
                      item.user.fullName
                        ?.toLowerCase()
                        ?.includes(searchInput?.trim()?.toLowerCase())))
              )
              .map((user) => (
                <Flex key={user.user.id} justify="space-between" align="center">
                  <Flex gap={12} align="center">
                    <Avatar
                      className="hover:cursor-pointer"
                      src={user.user.avatarUrl}
                      alt={user.user.fullName}
                      size={45}
                      radius="xl"
                      onClick={() =>
                        router.push(`${ROUTER.USER}/${user.user.id}`)
                      }
                    />
                    <Stack gap={2}>
                      <Link href={`${ROUTER.USER}/${user.user.id}`}>
                        <Text c={COLORS.PURPLE}>{user.user.fullName}</Text>
                      </Link>
                      <Text fz={13} c="gray">
                        {user.user._count.followers || 0}{" "}
                        {user.user._count.followers === 1
                          ? "Follower"
                          : "Followers"}
                      </Text>
                    </Stack>
                  </Flex>
                </Flex>
              ))}
          </Stack>
          {/* </Checkbox.Group> */}
        </ScrollArea>
        {/* <Button
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
        </Button> */}
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
          See more
        </Text>
      </Button>
    </>
  );
};

export default EventInvite;
