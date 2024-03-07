import { ROUTER } from "@/constant";
import { COLORS } from "@/constant/color";
import { NOTIFICATION_TYPES } from "@/constant/notification";
import { Notification } from "@/types/notification";
import { Avatar, Button, Flex, Space, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

export type NotificationItemProps = {
  notification: Notification;
};
export const NotificationItem = ({ notification }: NotificationItemProps) => {
  dayjs.extend(relativeTime);

  const handleAcceptEvent = () => {};
  return (
    <>
      <Flex gap={8}>
        <Link href={`${ROUTER.USER}/${notification.senderId}`}>
          <Avatar
            src={notification.sender.avatarUrl}
            alt={notification.sender.fullName}
          />
        </Link>
        <Flex justify={"space-between"} w={"100%"}>
          <Stack w={"80%"}>
            <Link href={`${ROUTER.USER}/${notification.senderId}`}>
              <Text c={COLORS.PURPLE}>
                {notification.sender.fullName}
                <Text c="dimmed">{notification.body}</Text>
              </Text>
            </Link>{" "}
            {notification.notificationType ===
              NOTIFICATION_TYPES.EVENT_INVITATION && (
              <Flex justify={"space-evenly"}>
                <Button radius={"md"} variant="outline" color="gray">
                  Reject
                </Button>
                <Link href={`${ROUTER.EVENT}/${notification.objectId}`}>
                  <Button
                    radius={"md"}
                    variant="gradient"
                    gradient={{
                      from: "rgba(86, 105, 255, 1)",
                      to: "rgba(191, 86, 255, 1)",
                      deg: 180,
                    }}
                    onClick={handleAcceptEvent}
                  >
                    Accept
                  </Button>
                </Link>
              </Flex>
            )}
          </Stack>
          <Text c="dimmed" fz={12}>
            {dayjs(notification.createdAt).fromNow()}
          </Text>
        </Flex>
      </Flex>
      <Space h={"xl"} />
    </>
  );
};
