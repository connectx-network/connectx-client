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

const MessagePage = () => {
  const [connectedUsers, setConnectedUser] = useState([...new Array(5)]);

  return (
    <>
      <Flex justify={"space-between"}>
        <Title order={2} c="dark" fz={24}>
          Chats
        </Title>
        <Flex gap={8}>
          <Icons.newChat className="cursor-pointer" />
          <Icons.menuChatMarked className="cursor-pointer" />
        </Flex>
      </Flex>
      <Space h={"xl"} />
      <Flex gap={16} className="pt-2">
        <Stack>
          <Flex
            w={56}
            h={56}
            justify={"center"}
            align={"center"}
            className="rounded-xl border-[2px] border-solid border-[#ADB5BD] cursor-pointer"
          >
            <Icons.plus color="#ADB5BD" />
          </Flex>
          <Text fz={10}>Your story</Text>
        </Stack>
        {connectedUsers?.map((e) => (
          <Stack maw={60}>
            <Indicator radius="xl" size={10} color="green" inline>
              <Image
                src={"https://picsum.photos/200"}
                w={56}
                h={56}
                radius={"lg"}
                className="cursor-pointer"
              />
            </Indicator>
            <Text fz={10} lineClamp={1}>
              Johny Deepdadadasdasdasdasdasdasd
            </Text>
          </Stack>
        ))}
      </Flex>
      <Divider my={16} />
      <TextInput
        radius={"md"}
        placeholder="Search..."
        leftSection={<Icons.search className="w-4 h-4 fill-slate-700" />}
      />
    </>
  );
};

export default MessagePage;
