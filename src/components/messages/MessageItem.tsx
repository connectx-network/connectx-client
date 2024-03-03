"use client";

import { useAuthStore } from "@/store/auth.store";
import { Text } from "@mantine/core";
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
    <div
      className={clsx(
        " p-2 rounded-[16px] w-fit rounded-bl-none text-white",
        isMyMessage &&
          "rounded-br-none rounded-bl-[16px] self-end bg-[#6465FF] ",
        !isMyMessage && "bg-[#166FF6]"
      )}
    >
      {message.content}
      <Text fz={10} className={clsx(isMyMessage && "text-right")}>
        {dayjs(message.timestamp).format("hh:mm A")}
      </Text>
    </div>
  );
};
