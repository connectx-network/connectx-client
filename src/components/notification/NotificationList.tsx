import { Notification } from "@/types/notification";
import { Icons } from "@/components/icons";
import { NotificationItem } from "./NotificationItem";
import { Flex, Stack, Text } from "@mantine/core";

export type NotificationListProps = {
  notifications: Notification[];
};

export const NotificationList = ({ notifications }: NotificationListProps) => {
  if (notifications?.length === 0)
    return (
      <Stack align={"center"}>
        <Icons.noNotiFound />
        <Text c="#344B67">No Notifications</Text>
      </Stack>
    );
  return (
    <>
      {notifications.map((noti, index) => (
        <NotificationItem key={index} notification={noti} />
      ))}
    </>
  );
};
