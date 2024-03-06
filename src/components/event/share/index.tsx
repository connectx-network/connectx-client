"use client";

import { Icons } from "@/components/icons";
import { ActionIcon, Flex, Modal, SimpleGrid, Text } from "@mantine/core";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconShare } from "@tabler/icons-react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  RedditShareButton,
  RedditIcon,
} from "react-share";

const ShareEvent = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const clipboard = useClipboard();
  const url = window.location.href;
  const shareEventSocialList = [
    {
      icon: (
        <ActionIcon
          size="lg"
          color="rgba(239, 233, 233, 1)"
          variant="filled"
          w={44}
          h={44}
          radius={12}
          onClick={() => {
            clipboard.copy(url);
            notifications.show({
              message: "Link copied to clipboard",
            });
          }}
        >
          <Icons.copyLink />
        </ActionIcon>
      ),
      label: "Copy Link",
    },
    {
      icon: (
        <WhatsappShareButton url={url}>
          <Icons.whatsapp />
        </WhatsappShareButton>
      ),
      label: "WhatsApp",
    },
    {
      icon: (
        <FacebookShareButton url={url}>
          <Icons.facebook />
        </FacebookShareButton>
      ),
      label: "Facebook",
    },
    {
      icon: (
        <FacebookMessengerShareButton url={url} appId="">
          <Icons.messenger />
        </FacebookMessengerShareButton>
      ),
      label: "Messenger",
    },
    {
      icon: (
        <TwitterShareButton url={url}>
          <Icons.twitter />
        </TwitterShareButton>
      ),
      label: "Twitter",
    },
    {
      icon: <Icons.instagram />,
      label: "Instagram",
    },
    {
      icon: <Icons.skype />,
      label: "Skype",
    },

    {
      icon: (
        <RedditShareButton url={url}>
          <RedditIcon size={36} borderRadius={12} />
        </RedditShareButton>
      ),
      label: "Reddit",
    },
  ];
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Share with friends"
        centered
      >
        <SimpleGrid cols={4}>
          {shareEventSocialList.map((item, index) => (
            <Flex key={index} direction="column" gap={4} align="center">
              {item.icon}
              <Text>{item.label}</Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Modal>
      <ActionIcon
        size="lg"
        variant="gradient"
        gradient={{
          from: "rgba(86, 105, 255, 1)",
          to: "rgba(191, 86, 255, 1)",
          deg: 180,
        }}
        onClick={open}
      >
        <IconShare />
      </ActionIcon>
    </>
  );
};

export default ShareEvent;
