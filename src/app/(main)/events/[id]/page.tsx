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
  useComputedColorScheme,
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
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import ReactPlayer from "react-player";

import {
  checkJoinedEventRequest,
  getEventDetailRequest,
  joinEventRequest,
} from "@/api/event";
import { Icons } from "@/components/icons";
import { QUERY_KEY } from "@/constant/query-key";
import { EventForm, EventInviteBtn, EventShareBtn } from "@/components/event";
import { useAuthStore } from "@/store/auth.store";
import { showErrorNotification, showSuccessNotification } from "@/utils";
import { COLORS } from "@/constant/color";
import { EventAssetType, EventStatus, EventType } from "@/types/event";

dayjs.extend(LocalizedFormat);
const MAP_MODE = "search";
const MAX_USER_DISPLAY = 3;

const EventDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { auth } = useAuthStore();
  const queryClient = useQueryClient();
  const [openedQRCode, { open: openQRCode, close: closeQRCode }] =
    useDisclosure(false);
  const isExistNavbar = useMediaQuery("(min-width: 768px)");

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

  console.log("😻 ~ EventDetail ~ checkJoinedEvent:", checkJoinedEvent);
  const joinEventMutation = useMutation({
    mutationFn: async () => {
      if (!eventDetailData) return;
      await joinEventRequest(eventDetailData.id);
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
    if (eventDetailData?.eventType === EventType.READONLY) {
      window.open(eventDetailData?.registUrl, "_blank");
      return;
    }
    if (isJoinedEvent) {
      openQRCode();
    } else {
      joinEventMutation.mutateAsync();
    }
  };

  const eventAssets = useMemo(() => {
    const urlBackground =
      eventDetailData?.eventAssets?.find(
        (item) => item.type === EventAssetType.BACKGROUND
      )?.url || "";

    const urlVideo =
      eventDetailData?.eventAssets?.find(
        (item) => item.type === EventAssetType.VIDEO
      )?.url || "";

    return {
      background: urlBackground,
      video: urlVideo,
    };
  }, [eventDetailData?.eventAssets]);

  const eventStatus = useMemo(() => {
    if (!eventDetailData) return;
    if (dayjs().isSameOrAfter(dayjs(eventDetailData.eventEndDate))) {
      return {
        color: "red",
        title: EventStatus.ENDED,
      };
    }
    if (
      dayjs().isBetween(
        dayjs(eventDetailData.eventDate),
        dayjs(eventDetailData.eventEndDate)
      )
    ) {
      return {
        color: "green",
        title: EventStatus.ONGOING,
      };
    }

    if (dayjs().isSameOrBefore(dayjs(eventDetailData.eventDate))) {
      return {
        color: "blue",
        title: EventStatus.UPCOMING,
      };
    }
  }, [eventDetailData]);

  const isEndEvent = useMemo(
    () => eventStatus?.title && eventStatus.title !== EventStatus.ENDED,
    [eventStatus]
  );

  return (
    <div>
      {eventDetailData?.eventType === EventType.READONLY && (
        <div
          style={{
            position: "sticky",
            bottom: 0,
            left: 0,
            top: "calc(100vh - 120px)",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          <Button
            className="hover:opacity-90 shadow-md"
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
            style={
              isExistNavbar
                ? {
                    position: "relative",
                    pointerEvents: "auto",
                  }
                : {
                    position: "fixed",
                    bottom: 50,
                    left: "50%",
                    transform: "translateX(-50%)",
                    pointerEvents: "auto",
                  }
            }
            onClick={() => handleProcessEvent(!!checkJoinedEvent?.joined)}
          >
            {checkJoinedEvent?.joined ? "Show QR code" : "Join"}
          </Button>
        </div>
      )}
      {eventDetailData && (
        <Center pb={70} pt={20}>
          <Stack maw={672}>
            <Box maw={672} pos="relative">
              <Image
                src={eventAssets.background}
                radius={12}
                alt={eventDetailData.name}
              />
              <Flex gap={8} pos="absolute" top={8} right={8}>
                {/* <ActionIcon
                  aria-label="Bookmark event"
                  size="lg"
                  variant="gradient"
                  gradient={{
                    from: "rgba(86, 105, 255, 1)",
                    to: "rgba(191, 86, 255, 1)",
                    deg: 180,
                  }}
                >
                  <IconBookmark />
                </ActionIcon> */}
                <EventShareBtn id={id} />
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
                          alt={joinUser.user.fullName}
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
                <EventInviteBtn eventId={eventDetailData?.id} />
              </Flex>
            </Box>

            <Space h={40}></Space>
            <Title order={2}>{eventDetailData.name}</Title>
            {checkJoinedEvent?.joined && (
              <Flex align="center" gap={4}>
                <IconCircleCheck color="rgb(54, 162, 96)" size={16} />
                <Text c="rgb(54, 162, 96)" fz={12}>
                  You have joined the event
                </Text>
              </Flex>
            )}
            <Flex align="center" gap={8}>
              <Icons.calenderFill className="w-[48px] h-[48px]" />
              <Stack gap={4} w={"80%"}>
                <Text fz={16}> {dateTimeEvent?.title}</Text>
                <Text fz={12} c="rgba(116, 118, 136, 1)">
                  {dateTimeEvent?.text}
                </Text>
              </Stack>
            </Flex>

            <Flex align="center" gap={8}>
              <Icons.locationFill className="w-[48px] h-[48px]" />
              <Stack gap={4} w={"80%"}>
                <Text fz={16}> {eventDetailData?.location}</Text>
                {/* <Text fz={12} c="rgba(116, 118, 136, 1)">
                  Location
                </Text> */}
              </Stack>
            </Flex>

            <Divider />
            <Text fz={18} fw={500}>
              About event
            </Text>
            <Spoiler
              maxHeight={400}
              showLabel="Show more"
              hideLabel="Hide"
              fz={16}
              fw={200}
              className="whitespace-break-spaces"
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

            {eventAssets.video && (
              <>
                <Divider />
                <Text fz={18} fw={500}>
                  Video
                </Text>
                <Flex justify="center" gap={8}>
                  <div className="relative w-full min-h-72">
                    <ReactPlayer
                      url={eventAssets.video}
                      width="100%"
                      height="100%"
                    />
                  </div>
                </Flex>
              </>
            )}
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
                  target="_blank"
                >
                  <Text fz={16} fw={500} c={COLORS.PURPLE}>{`${host.title}${
                    index < originArr.length - 1 ? "," : ""
                  }`}</Text>
                </Link>
              ))}
            </Flex>

            {eventDetailData?.eventLinks.length > 0 &&
              eventDetailData?.eventLinks.map((link) => (
                <div key={link.id}>
                  <Text fz={18} fw={500} mb={12}>
                    {link.title}
                  </Text>

                  <Link
                    href={link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className=" text-[#5669ff]"
                  >
                    <span className="hover:underline hover:cursor-pointer">
                      Xem tại đây
                    </span>
                  </Link>
                </div>
              ))}
            {!checkJoinedEvent?.joined &&
              eventDetailData.eventType !== EventType.READONLY && (
                <>
                  <Divider />
                  <Text fz={18} fw={500}>
                    Attendee contact details
                  </Text>
                  <EventForm eventData={eventDetailData} />
                </>
              )}
          </Stack>
        </Center>
      )}

      <Modal
        opened={openedQRCode}
        onClose={closeQRCode}
        withCloseButton={false}
        centered
        size="auto"
        styles={{
          body: {
            padding: 0,
            backgroundColor: "transparent",
          },
          content: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Flex
          direction="column"
          gap={8}
          style={{ backgroundColor: "transparent" }}
        >
          <div className="p-4 bg-white rounded-sm">
            <QRCodeSVG
              value={`${eventDetailData?.id};${auth.user?.id}`}
              size={300}
            />
          </div>
          <Button
            variant="gradient"
            gradient={{
              from: "rgba(86, 105, 255, 1)",
              to: "rgba(191, 86, 255, 1)",
              deg: 180,
            }}
            onClick={closeQRCode}
          >
            Close
          </Button>
        </Flex>
      </Modal>
    </div>
  );
};

export default EventDetail;
