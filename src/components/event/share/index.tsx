"use client";

import { Icons } from "@/components/icons";
import {
  ActionIcon,
  Flex,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBookmark, IconShare } from "@tabler/icons-react";

const ShareEvent = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Share with friends"
        centered
      >
        <SimpleGrid cols={4}>
          <Flex direction="column" gap={4} align="center">
            <ActionIcon
              size="lg"
              color="rgba(239, 233, 233, 1)"
              variant="filled"
              w={40}
              h={40}
              radius={12}
            >
              <Icons.copyLink />
            </ActionIcon>
            <Text c="rgba(60, 62, 86, 1)">Copy Link</Text>
          </Flex>
          <Flex direction="column" gap={4} align="center">
            <Icons.whatsapp />
            <Text c="rgba(60, 62, 86, 1)">WhatsApp</Text>
          </Flex>
          <Flex direction="column" gap={4} align="center">
            <Icons.facebook />
            <Text c="rgba(60, 62, 86, 1)">Facebook</Text>
          </Flex>
          <Flex direction="column" gap={4} align="center">
            <Icons.messenger />
            <Text c="rgba(60, 62, 86, 1)">Messenger</Text>
          </Flex>
          <Flex direction="column" gap={4} align="center">
            <Icons.twitter />
            <Text c="rgba(60, 62, 86, 1)">Twitter</Text>
          </Flex>
          <Flex direction="column" gap={4} align="center">
            <Icons.instagram />
            <Text c="rgba(60, 62, 86, 1)">Instagram</Text>
          </Flex>
          <Flex direction="column" gap={4} align="center">
            <Icons.skype />
            <Text c="rgba(60, 62, 86, 1)">Skype</Text>
          </Flex>
        </SimpleGrid>
      </Modal>
      <ActionIcon
        size="lg"
        color="rgba(86, 105, 255, 1)"
        variant="filled"
        onClick={open}
      >
        <IconShare />
      </ActionIcon>
    </>
  );
};

export default ShareEvent;
