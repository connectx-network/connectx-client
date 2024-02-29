import { Notification } from "@/types/notification";
import { Avatar, Button, Flex, Space, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export type NotificationItemProps = {
  notification: Notification;
};
export const NotificationItem = ({ notification }: NotificationItemProps) => {
  dayjs.extend(relativeTime);

  return (
    <>
      <Flex gap={8}>
        <Avatar src={notification.userAvatarCreated} />
        <Flex justify={"space-between"} w={"100%"}>
          <Stack w={"70%"}>
            <Text>
              {notification.userFullnameCreated}{" "}
              <Text component="span" c="dimmed">
                {notification.content}
              </Text>
            </Text>
            {notification.isInvite && (
              <Flex justify={"space-evenly"}>
                <Button radius={"md"} variant="outline" color="gray">
                  Reject
                </Button>
                <Button
                  radius={"md"}
                  variant="gradient"
                  gradient={{
                    from: "rgba(86, 105, 255, 1)",
                    to: "rgba(191, 86, 255, 1)",
                    deg: 180,
                  }}
                >
                  Accept
                </Button>
              </Flex>
            )}
          </Stack>
          <Text c="dimmed" fz={12}>
            {dayjs(notification.createdDate).fromNow()}
          </Text>
        </Flex>
      </Flex>
      <Space h={"xl"} />
    </>
  );
};
