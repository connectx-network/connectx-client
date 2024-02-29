"use client";

import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Space,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useMemo } from "react";
import { IconBookmark, IconShare } from "@tabler/icons-react";

import { getEventDetailRequest } from "@/api/event";
import { Icons } from "@/components/icons";
import { QUERY_KEY } from "@/constant/query-key";
import { EventInviteBtn, EventShareBtn } from "@/components/event";

dayjs.extend(LocalizedFormat);

const EventDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: eventDetailData } = useQuery({
    queryKey: [QUERY_KEY.GET_EVENT_DETAIL, id],
    queryFn: () => getEventDetailRequest(id),
  });

  const dateTimeEvent = useMemo(() => {
    if (!eventDetailData) return {};
    return {
      title: dayjs(eventDetailData.eventDate).format("DD/MM/YYYY"),
      text: dayjs(eventDetailData.eventDate).format("llll"),
    };
  }, [eventDetailData]);
  return (
    <>
      {eventDetailData && (
        <Center>
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
                  padding: "4px 12px",
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
                    <Avatar
                      size="sm"
                      src="https://www.shutterstock.com/image-vector/cute-cartoon-rubber-duck-vector-600nw-2276837591.jpg"
                    />
                    <Avatar
                      size="sm"
                      src="https://duck-world.com/cdn/shop/collections/Share_a_picture_of_your_duck_in_its_new_home_and_Tag_duck.world.uk_on_Instagram_for_your_chance_to_win_one_of_our_collectibles_36.png?v=1685291022"
                    />
                    <Avatar
                      size="sm"
                      src="https://curatingcambridge.co.uk/cdn/shop/products/CambridgeDuckMarch2023.jpg?v=1679478515"
                    />
                  </Avatar.Group>
                  <Text c="rgba(63, 56, 221, 1)" fz={12}>
                    +20 Going
                  </Text>
                </Flex>
                <EventInviteBtn />
              </Flex>
            </Box>

            <Space h={40}></Space>
            <Title order={2}>{eventDetailData.name}</Title>
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
          </Stack>
        </Center>
      )}
    </>
  );
};

export default EventDetail;
