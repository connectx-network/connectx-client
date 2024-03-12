"use client";

import { Icons } from "@/components/icons";
import {
  Flex,
  Text,
  Title,
  Stack,
  Image,
  Space,
  Divider,
  TextInput,
  Indicator,
  ActionIcon,
  useComputedColorScheme,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { PersonChatItem } from "../../../components/messages/PersonChatItem";
import cx from "clsx";
import { IconMessagePlus, IconNews, IconSearch } from "@tabler/icons-react";

const MessagePage = () => {
  const [connectedUsers, setConnectedUser] = useState([...new Array(5)]);
  const computedColorScheme = useComputedColorScheme();
  const isDarkMode = useMemo(
    () => computedColorScheme === "dark",
    [computedColorScheme]
  );
  return (
    <>
      <div
        className={cx([
          "sticky top-[60px] z-[1]",
          isDarkMode ? "bg-[#1f1212]" : "bg-white",
        ])}
      >
        <Flex justify={"space-between"}>
          <Title order={2} c="dark" fz={24}>
            Chats
          </Title>
          <Flex gap={8}>
            <ActionIcon
              aria-label="New chat"
              variant="subtle"
              c="gray"
              size="lg"
              radius={50}
            >
              <IconMessagePlus
                className="cursor-pointer"
                color={isDarkMode ? "#f0f0f0" : "black"}
              />
            </ActionIcon>
          </Flex>
        </Flex>
        <Space h={"xl"} />
        <Flex
          gap={24}
          className="no-scrollbar pt-2 overflow-x-scroll md:overflow-x-hidden md:hover:overflow-x-scroll"
        >
          <Stack align={"center"}>
            <Flex
              w={64}
              h={64}
              justify={"center"}
              align={"center"}
              className="rounded-xl border-[2px] border-solid border-[#ADB5BD] cursor-pointer"
            >
              <Icons.plus color="#ADB5BD" />
            </Flex>
            <Text fz={12}>Your story</Text>
          </Stack>
          {connectedUsers?.map((e, index) => (
            <Stack maw={60} key={index}>
              <Indicator radius="xl" size={10} color="green" inline>
                <Image
                  src={"https://picsum.photos/200"}
                  w={64}
                  h={64}
                  radius={"lg"}
                  className="cursor-pointer"
                />
              </Indicator>
              <Text fz={12} lineClamp={1}>
                Johny Deepdad
              </Text>
            </Stack>
          ))}
        </Flex>
        <Divider my={16} />
        <TextInput
          radius={"md"}
          placeholder="Search..."
          size="lg"
          leftSection={<IconSearch className="w-5 h-5" />}
        />
      </div>

      <div className="min-h-[70vh] ">
        {[...new Array(15)].map((e, index) => (
          <PersonChatItem key={index} isDarkMode={isDarkMode} />
        ))}
      </div>
    </>
  );
};

export default MessagePage;
