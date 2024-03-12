"use client";

import { MessageItem } from "@/components/messages/MessageItem";
import {
  Avatar,
  Divider,
  Flex,
  Title,
  Text,
  Stack,
  TextInput,
  Space,
  ActionIcon,
  useComputedColorScheme,
} from "@mantine/core";
import { MESSAGES } from "../mock";
import { Icons } from "@/components/icons";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { ROUTER } from "@/constant";
import cx from "clsx";
import { useMemo } from "react";

const PersonalChatPage = () => {
  const computedColorScheme = useComputedColorScheme();
  const isDarkMode = useMemo(
    () => computedColorScheme === "dark",
    [computedColorScheme]
  );
  return (
    <div>
      <Flex
        gap={8}
        className={cx([
          "sticky top-[60px] z-[1] pt-1",
          isDarkMode ? "bg-[#1f1212]" : "bg-white",
        ])}
        align={"center"}
      >
        <Link href={ROUTER.MESSAGE}>
          <ActionIcon
            aria-label="Search event"
            variant="subtle"
            c="gray"
            size="lg"
            radius={50}
          >
            <IconArrowLeft
              className="w-5 h-5"
              stroke={1.5}
              color={computedColorScheme === "light" ? "black" : "#ffffff"}
            />
          </ActionIcon>
        </Link>

        <Avatar src={"https://picsum.photos/200"} w={48} h={48} />
        <div>
          <Title order={2} c="dark" fz={24}>
            Tony Stark
          </Title>
          <Text c="dimmed" fz={12}>
            Active 25 minutes ago
          </Text>
        </div>
      </Flex>
      <Stack className="overflow-y-auto no-scrollbar flex-1 pt-4 min-h-[70vh]">
        {MESSAGES.map((message) => (
          <MessageItem key={message.timestamp} message={message} />
        ))}
      </Stack>
      <Space h={28} />
      <Flex
        className="sticky bottom-[16px] w-full"
        justify={"center"}
        align={"center"}
      >
        <TextInput
          size="lg"
          radius={16}
          placeholder="Type something..."
          w={"100%"}
          rightSection={
            <ActionIcon variant="outline" color="white" size={46} radius={16}>
              <Icons.sendMessage />
            </ActionIcon>
          }
        />
      </Flex>
    </div>
  );
};

export default PersonalChatPage;
