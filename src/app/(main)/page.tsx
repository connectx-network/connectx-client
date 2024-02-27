"use client";
import {
  EventCard,
  EventHorizontialCard,
  EventFilter,
} from "@/components/event";
import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";

const Main = () => {
  return (
    <div>
      <EventFilter />
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </SimpleGrid>

      <Box mx="auto" pos="relative" maw={500} my={16}>
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
      <Stack>
        <Title order={2} c="dark.9" fz={24}>
          Upcoming Events
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          <EventHorizontialCard />
          <EventHorizontialCard />
          <EventHorizontialCard />
        </SimpleGrid>
      </Stack>
    </div>
  );
};
export default Main;
