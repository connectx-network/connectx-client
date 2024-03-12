import { ActionIcon, Drawer, useComputedColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Icons } from "../icons";
import { useEffect, useState } from "react";
import { Notification } from "@/types/notification";
import { NotificationItem } from "./NotificationItem";
import { useMutation } from "@tanstack/react-query";
import { getNotifications } from "@/api/notification";
import { PaginationResponse } from "@/types/common";
import { NotificationList } from "./NotificationList";
import { IconBell } from "@tabler/icons-react";

const Notification = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 440px)");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const mutationFetchNotis = useMutation({
    mutationFn: () => getNotifications(),
    onSuccess: (data: PaginationResponse<Notification>) => {
      setNotifications(data.data);
    },
    onError: () => {
      console.log("Error fetch noti");
    },
  });
  useEffect(() => {
    mutationFetchNotis.mutateAsync();
  }, []);
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
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
        <NotificationList notifications={notifications} />
      </Drawer>

      <ActionIcon
        aria-label="Notification"
        variant="subtle"
        c="gray"
        size="lg"
        radius={50}
        onClick={open}
      >
        {computedColorScheme !== "light" ? (
          <IconBell className="w-6 h-6" color="white" stroke={1.5} />
        ) : (
          <IconBell className="w-6 h-6" color="black" stroke={1.5} />
        )}
      </ActionIcon>
    </>
  );
};

export default Notification;
