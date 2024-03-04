"use client";

import { Icons } from "@/components/icons";
import {
  Flex,
  Text,
  Title,
  Stack,
  Avatar,
  Image,
  Space,
  Divider,
  TextInput,
  Indicator,
} from "@mantine/core";
import { useState } from "react";
import { PersonChatItem } from "./PersonChatItem";

const MessagePage = () => {
  const [connectedUsers, setConnectedUser] = useState([...new Array(5)]);

  return (
    <>
      <div className="sticky top-[60px] z-[1] bg-white">
        <Flex justify={"space-between"}>
          <Title order={2} c="dark" fz={24}>
            Chats
          </Title>
          <Flex gap={8}>
            <Icons.newChat className="cursor-pointer" />
            {/* <Icons.menuChatMarked className="cursor-pointer" /> */}
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
          leftSection={<Icons.search className="w-4 h-4 fill-slate-700" />}
        />
      </div>

      <div className="min-h-[70vh] ">
        {[...new Array(15)].map((e, index) => (
          <PersonChatItem key={index} />
        ))}
      </div>
    </>
  );
};

export default MessagePage;
