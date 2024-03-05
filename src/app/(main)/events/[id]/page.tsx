"use client";

import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Modal,
  Space,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useMemo } from "react";
import { IconBookmark } from "@tabler/icons-react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { IconCircleCheck } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import {
  checkJoinedEventRequest,
  getEventDetailRequest,
  joinEventRequest,
} from "@/api/event";
import { Icons } from "@/components/icons";
import { QUERY_KEY } from "@/constant/query-key";
import { EventInviteBtn, EventShareBtn } from "@/components/event";
import { useAuthStore } from "@/store/auth.store";
import { showErrorNotification, showSuccessNotification } from "@/utils";

dayjs.extend(LocalizedFormat);
const MAP_MODE = "search";
const MAX_USER_DISPLAY = 3;

const EventDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { auth } = useAuthStore();
  const queryClient = useQueryClient();
  const [openedQRCode, { open: openQRCode, close: closeQRCode }] =
    useDisclosure(false);

  const { data: eventDetailData } = useQuery({
    queryKey: [QUERY_KEY.GET_EVENT_DETAIL, id],
    queryFn: () => getEventDetailRequest(id),
  });

  const { data: checkJoinedEvent, refetch: checkJoinedEventRefetch } = useQuery(
    {
      queryKey: [QUERY_KEY.GET_CHECK_JOINED_EVENT, id],
      queryFn: () => checkJoinedEventRequest(id),
      retry: 0,
    }
  );

  const joinEventMutation = useMutation({
    mutationFn: async () => {
      await joinEventRequest(id);
    },
    onSuccess: async () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      showSuccessNotification({
        title: "Success",
        message: "Joined event successfully",
      });
      await checkJoinedEventRefetch();
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEY.GET_JOINED_USER_EVENT_LIST],
      });
    },
    onError: (error) => {
      showErrorNotification({
        title: "Failed",
        message: "Failed to join event",
      });
    },
  });

  const dateTimeEvent = useMemo(() => {
    if (!eventDetailData) return {};
    let text = "";
    if (
      dayjs(eventDetailData.eventDate).format("DD/MM/YYYY") ===
      dayjs(eventDetailData.eventEndDate).format("DD/MM/YYYY")
    ) {
      const time = `${dayjs(eventDetailData.eventDate).format(
        "HH:mm"
      )} - ${dayjs(eventDetailData.eventEndDate).format("HH:mm")}`;
      const date = dayjs(eventDetailData.eventDate).format(
        "dddd, MMMM D, YYYY"
      );
      text = `${time} ${date}`;
    } else {
      text = `${dayjs(eventDetailData.eventDate).format(
        "HH:mm dddd, MMMM D, YYYY"
      )} - ${dayjs(eventDetailData.eventEndDate).format(
        "HH:mm dddd, MMMM D, YYYY"
      )}`;
    }
    return {
      title: dayjs(eventDetailData.eventDate).format("DD/MM/YYYY"),
      text: text,
    };
  }, [eventDetailData]);
  const eventLocationUrl = useMemo(() => {
    if (!eventDetailData?.location)
      return {
        search: "",
        embed: "",
      };
    const search = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      eventDetailData?.location
    )}`;
    const embed = `https://www.google.com/maps/embed/v1/${MAP_MODE}?key=${
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    }&q=${encodeURIComponent(eventDetailData?.location)}`;
    return {
      search,
      embed,
    };
  }, [eventDetailData?.location]);
  const handleProcessEvent = (isJoinedEvent: boolean) => {
    if (isJoinedEvent) {
      openQRCode();
    } else {
      joinEventMutation.mutateAsync();
    }
  };

  return (
    <div>
      {eventDetailData && (
        <Center pb={70} pt={20}>
          <Stack maw={672}>
            <Box maw={672} pos="relative">
              <Image
                src={eventDetailData.eventAssets?.[0].url}
                radius={12}
                alt={eventDetailData.name}
              />
              <Flex gap={8} pos="absolute" top={8} right={8}>
                <ActionIcon
                  size="lg"
                  variant="gradient"
                  gradient={{
                    from: "rgba(86, 105, 255, 1)",
                    to: "rgba(191, 86, 255, 1)",
                    deg: 180,
                  }}
                >
                  <IconBookmark />
                </ActionIcon>
                <EventShareBtn />
              </Flex>
              <Flex
                gap={10}
                align="center"
                style={{
                  padding: "8px 16px",
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translate(-50%, 50%)",
                  backgroundColor: "white",
                  borderRadius: "100px",
                  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                }}
              >
                <Flex gap={10} align="center">
                  <Avatar.Group>
                    {eventDetailData.joinedEventUsers.map((joinUser, index) => {
                      if (index > MAX_USER_DISPLAY) return;
                      return (
                        <Avatar
                          key={joinUser.user.id}
                          size="sm"
                          src={joinUser.user.avatarUrl}
                        />
                      );
                    })}
                  </Avatar.Group>
                  {eventDetailData._count.joinedEventUsers >
                  MAX_USER_DISPLAY ? (
                    <Text c="rgba(63, 56, 221, 1)" fz={12} w="max-content">
                      +
                      {eventDetailData._count.joinedEventUsers -
                        MAX_USER_DISPLAY}{" "}
                      Going
                    </Text>
                  ) : (
                    <Text c="rgba(63, 56, 221, 1)" fz={12}>
                      {eventDetailData._count.joinedEventUsers} Joined
                    </Text>
                  )}
                </Flex>
                <EventInviteBtn eventId={id} />
              </Flex>
            </Box>

            <Space h={40}></Space>
            <Title order={2} c="rgb(37, 0, 97)">
              {eventDetailData.name}
            </Title>
            {checkJoinedEvent?.joined && (
              <Flex align="center" gap={4}>
                <IconCircleCheck color="rgb(54, 162, 96)" size={16} />
                <Text c="rgb(54, 162, 96)" fz={12}>
                  You have joined the event
                </Text>
              </Flex>
            )}
            <Flex align="center" gap={8}>
              <Icons.calenderFill />
              <Stack gap={4}>
                <Text fz={16}> {dateTimeEvent?.title}</Text>
                <Text fz={12} c="rgba(116, 118, 136, 1)">
                  {dateTimeEvent?.text}
                </Text>
              </Stack>
            </Flex>

            <Flex align="center" gap={8}>
              <Icons.locationFill />
              <Stack gap={4}>
                <Text fz={16}>Location</Text>
                <Text fz={12} c="rgba(116, 118, 136, 1)">
                  {eventDetailData?.location}
                </Text>
              </Stack>
            </Flex>

            <Divider />
            <Text fz={18} fw={500}>
              About event
            </Text>
            <Spoiler
              maxHeight={80}
              showLabel="Show more"
              hideLabel="Hide"
              fz={16}
              fw={200}
            >
              {eventDetailData.description}
            </Spoiler>
            <Divider />
            <Text fz={18} fw={500}>
              Location
            </Text>
            <Link href={eventLocationUrl?.search} className="rounded-md">
              <iframe
                src={eventLocationUrl?.embed}
                title={eventDetailData.location}
                loading="lazy"
                style={{
                  border: 0,
                  borderRadius: "12px",
                  width: "100%",
                  height: "250px",
                  pointerEvents: "none",
                }}
              />
            </Link>
            <Divider />
            <Text fz={18} fw={500}>
              Host by
            </Text>
            <Flex gap={8}>
              {eventDetailData.eventHosts.map((host, index, originArr) => (
                <Link
                  key={host.id}
                  href={host?.url || ""}
                  className="hover:underline hover:text-purple-700"
                >
                  {`${host.title}${index < originArr.length - 1 ? "," : ""}`}
                </Link>
              ))}
            </Flex>
          </Stack>
        </Center>
      )}
      {auth.isAuthenticated && (
        <Button
          className="hover:opacity-90"
          h={58}
          w={200}
          radius={12}
          variant="gradient"
          gradient={{
            from: "rgba(86, 105, 255, 1)",
            to: "rgba(191, 86, 255, 1)",
            deg: 180,
          }}
          justify="space-between"
          leftSection={<span />}
          rightSection={<Icons.rightArrow />}
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onClick={() => handleProcessEvent(!!checkJoinedEvent?.joined)}
        >
          {checkJoinedEvent?.joined ? "Show QR code" : "Join"}
        </Button>
      )}
      <Modal
        opened={openedQRCode}
        onClose={closeQRCode}
        withCloseButton={false}
        centered
        size="auto"
      >
        <QRCodeSVG value="https://reactjs.org/" size={300} />
      </Modal>
    </div>
  );
};

export default EventDetail;
