"use client";
import { getEventListRequest } from "@/api/event";
import { EventCard, EventHorizontialCard } from "@/components/event";
import { Icons } from "@/components/icons";
import { ROUTER } from "@/constant";
import { QUERY_KEY } from "@/constant/query-key";
import { useCheckExistNavbar } from "@/hooks";
import { useEventListParamStore } from "@/store/event-list.store";
import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { EventAssetType } from "@/types/event";

const HomePage = () => {
  const { param } = useEventListParamStore();
  const router = useRouter();
  const isExistNavbar = useCheckExistNavbar();
  const { data: eventListData } = useQuery({
    queryKey: [QUERY_KEY.GET_EVENT_LIST, param],
    queryFn: () => getEventListRequest(param),
  });
  return (
    <div>
      <Flex gap={40}>
        <Text fz={18}>Upcoming Events</Text>
        <UnstyledButton onClick={() => router.push(ROUTER.EVENT)}>
          <Text c="gray" display="inline-block" mr={4}>
            See all
          </Text>
          <Icons.caretRightFill />
        </UnstyledButton>
      </Flex>
      <SimpleGrid
        cols={{ base: 1, xs: 2, md: 3, lg: isExistNavbar ? 4 : 3 }}
        mt={6}
      >
        {eventListData?.data.map((event) => {
          const backgroundImage =
            event.eventAssets?.find(
              (item) => item.type === EventAssetType.BACKGROUND
            )?.url || "";
          return (
            <EventCard
              key={event.id}
              id={event.shortId}
              name={event.name}
              imageUrl={backgroundImage}
              eventDate={event.eventDate}
              location={event.location}
              joinedUser={event.joinedEventUsers}
              count={event._count}
              shortId={event.shortId}
            />
          );
        })}
      </SimpleGrid>
      <Space h={40} />
      <Box pos="relative" maw={500} h={230} hidden>
        <Image
          component={NextImage}
          src="https://cryptoevents.global/wp-content/uploads/Crypto-Fest-2022.jpg"
          alt="Banner ads"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          radius={10}
          quality={60}
        />
        <Flex
          direction="column"
          justify="flex-start"
          align="flex-end"
          p="md"
          gap={4}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(30,35,51,0.84) 60%)",
            borderRadius: "10px",
          }}
        >
          <Title order={3} c="white" tt="uppercase" ta="end">
            Banner ads
          </Title>
          <Title order={2} c="white" tt="uppercase" ta="end">
            Name of event
          </Title>
          <Button
            variant="gradient"
            gradient={{
              from: "rgba(148, 20, 181, 1)",
              to: "rgba(54, 37, 82, 1)",
              deg: 180,
            }}
          >
            Join now
          </Button>
        </Flex>
      </Box>
      <Space h={40} />

      <Stack>
        <Flex gap={40}>
          <Text fz={18}>Near you</Text>
          <UnstyledButton>
            <Text c="gray" display="inline-block" mr={4}>
              See all
            </Text>
            <Icons.caretRightFill />
          </UnstyledButton>
        </Flex>
        <SimpleGrid
          cols={{
            base: 1,
            xs: 2,
            sm: isExistNavbar ? 1 : 2,
            md: 2,
            xl: isExistNavbar ? 3 : 2,
          }}
        >
          {eventListData?.data.map((event) => {
            const backgroundImage =
              event.eventAssets?.find(
                (item) => item.type === EventAssetType.BACKGROUND
              )?.url || "";
            return (
              <EventHorizontialCard
                key={event.id}
                event={{
                  id: event.shortId,
                  name: event.name,
                  date: event.eventDate,
                  imageUrl: backgroundImage,
                  location: event.location,
                  shortId: event.shortId,
                }}
              />
            );
          })}
        </SimpleGrid>
      </Stack>
    </div>
  );
};
export default HomePage;
