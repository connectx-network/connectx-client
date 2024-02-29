"use client";
import { getEventListRequest } from "@/api/event";
import { EventCard, EventHorizontialCard } from "@/components/event";
import { Icons } from "@/components/icons";
import { ROUTER } from "@/constant";
import { QUERY_KEY } from "@/constant/query-key";
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

const HomePage = () => {
  const { param } = useEventListParamStore();
  const router = useRouter();
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
      <SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 4 }} mt={6}>
        {eventListData?.data.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            name={event.name}
            imageUrl={event.eventAssets?.[0].url}
            eventDate={event.eventDate}
            location={event.location}
          />
        ))}
      </SimpleGrid>
      <Space h={40} />
      <Box pos="relative" maw={500}>
        <Image
          src="https://cryptoevents.global/wp-content/uploads/Crypto-Fest-2022.jpg"
          alt="Banner ads"
          maw={500}
          radius={10}
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
          <Text fz={18}>Upcoming Events</Text>
          <UnstyledButton>
            <Text c="gray" display="inline-block" mr={4}>
              See all
            </Text>
            <Icons.caretRightFill />
          </UnstyledButton>
        </Flex>
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 1, md: 2, xl: 3 }}>
          {eventListData?.data.map((event) => (
            <EventHorizontialCard
              key={event.id}
              event={{
                id: event.id,
                name: event.name,
                date: event.eventDate,
                imageUrl: event.eventAssets?.[0]?.url,
                location: event.location,
              }}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </div>
  );
};
export default HomePage;
