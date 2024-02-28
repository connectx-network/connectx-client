"use client";
import {
  EventCard,
  EventHorizontialCard,
  EventFilter,
} from "@/components/event";
import { Icons } from "@/components/icons";
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

const Main = () => {
  return (
    <div>
      <EventFilter />
      <Flex gap={40}>
        <Text fz={18}>Upcoming Events</Text>
        <UnstyledButton>
          <Text c="gray" display="inline-block" mr={4}>
            See all
          </Text>
          <Icons.caretRightFill />
        </UnstyledButton>
      </Flex>
      <SimpleGrid cols={{ base: 2, sm: 2, md: 3, lg: 4 }} mt={6}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
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
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, xl: 4 }}>
          <EventHorizontialCard />
          <EventHorizontialCard />
          <EventHorizontialCard />
          <EventHorizontialCard />
          <EventHorizontialCard />
          <EventHorizontialCard />
          <EventHorizontialCard />
        </SimpleGrid>
      </Stack>
    </div>
  );
};
export default Main;
