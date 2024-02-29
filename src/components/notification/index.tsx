import { ActionIcon, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Icons } from "../icons";
import { useState } from "react";
import { Notification } from "@/types/notification";
import { NotificationItem } from "./NotificationItem";

const MOCK_NOTI: Notification[] = [
  {
    id: "string",
    content: "Invite to Event name",
    createdDate: "2023/12/13",
    userIdCreated: "string",
    userAvatarCreated: "https://picsum.photos/200",
    userFullnameCreated: "Test",
    isInvite: true,
  },
  {
    id: "string",
    content: "Invite to Event name",
    createdDate: "2023/12/13",
    userIdCreated: "string",
    userAvatarCreated: "https://picsum.photos/200",
    userFullnameCreated: "Test",
  },
  {
    id: "string",
    content: "Invite to Event name",
    createdDate: "2023/12/13",
    userIdCreated: "string",
    userAvatarCreated: "https://picsum.photos/200",
    userFullnameCreated: "Test",
    isInvite: true,
  },
  {
    id: "string",
    content: "Invite to Event name Invite to Event name Invite to Event name",
    createdDate: "2024/1/2",
    userIdCreated: "string",
    userAvatarCreated: "https://picsum.photos/200",
    userFullnameCreated: "Test",
  },
  {
    id: "string",
    content: "Invite to Event name",
    createdDate: "2023/12/13",
    userIdCreated: "string",
    userAvatarCreated: "https://picsum.photos/200",
    userFullnameCreated: "Test",
  },
  {
    id: "string",
    content: "Invite to Event name",
    createdDate: "2023/12/13",
    userIdCreated: "string",
    userAvatarCreated: "https://picsum.photos/200",
    userFullnameCreated: "Test",
    isInvite: true,
  },
];
const Notification = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 440px)");
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTI);
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        styles={{
          inner: {
            top: isMobile ? 60 : 0,
          },
        }}
        overlayProps={{
          backgroundOpacity: isMobile ? 0 : 0.5,
          blur: isMobile ? 0 : 4,
        }}
      >
        {notifications.map((noti, index) => (
          <NotificationItem key={index} notification={noti} />
        ))}
      </Drawer>

      <ActionIcon
        variant="subtle"
        c="gray"
        size="lg"
        radius={50}
        onClick={open}
      >
        <Icons.bell className="w-6 h-6" />
      </ActionIcon>
    </>
  );
};

export default Notification;
