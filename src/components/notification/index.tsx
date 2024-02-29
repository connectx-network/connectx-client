import { ActionIcon, Burger, Button, Drawer } from "@mantine/core";
import { useDisclosure, useElementSize, useMediaQuery } from "@mantine/hooks";
import { Icons } from "../icons";

const Notification = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 440px)");
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
        Đây là nội dung thông báo
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
