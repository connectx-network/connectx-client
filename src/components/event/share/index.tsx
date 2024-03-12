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

type ShareEventProps = {
  id: string;
};

const ShareEvent = (props: ShareEventProps) => {
  const { id } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const clipboard = useClipboard();
  const url = `${window.origin}/${id}`;
  const handleShare = () => {
    navigator.share({
      url,
    });
  };
  const shareEventSocialList = [
    {
      icon: (
        <ActionIcon
          aria-label="Copy Link"
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
      icon: <Icons.messenger onClick={handleShare} />,
      label: "Messenger",
    },
    {
      icon: <Icons.twitter onClick={handleShare} />,
      label: "Twitter",
    },
    {
      icon: <Icons.instagram onClick={handleShare} />,
      label: "Instagram",
    },
    {
      icon: <Icons.skype onClick={handleShare} />,
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
        aria-label="Share event"
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
