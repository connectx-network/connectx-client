"use client";

import { useAuthStore } from "@/store/auth.store";
import { Avatar, Flex, Text } from "@mantine/core";
import clsx from "clsx";
import dayjs from "dayjs";
import { useMemo } from "react";

export const MessageItem = ({ message }: any) => {
  const { auth } = useAuthStore();
  const isMyMessage = useMemo(
    () => auth?.user?.id === message.senderId,
    [auth?.user?.id, message.senderId]
  );
  return (
    <Flex
      align={"flex-end"}
      gap={4}
      className={clsx(isMyMessage && "self-end")}
    >
      {!isMyMessage && (
        <Avatar src={"https://picsum.photos/200"} alt="Avatar" size={"sm"} />
      )}
      <div
        className={clsx([
          " p-2 rounded-t-[16px] w-fit text-white",
          isMyMessage && "rounded-bl-[16px] rounded-br-[0] bg-[#6465FF]",
          !isMyMessage && "rounded-bl-[0] rounded-br-[16px] bg-[#8798af]",
        ])}
      >
        {message.content}
        <Text fz={10} className={clsx(isMyMessage && "text-right")}>
          {dayjs(message.timestamp).format("hh:mm A")}
        </Text>
      </div>
    </Flex>
  );
};
