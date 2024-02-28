import { ActionIcon, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Icons } from "../icons";

const Notification = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer radius="md" opened={opened} onClose={close} position="right">
        {/* Drawer content */}
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
