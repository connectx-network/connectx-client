"use client";
import { EventFilter, EventHorizontialCard } from "@/components/event";
import { Flex, SimpleGrid, Space } from "@mantine/core";

const EventPage = () => {
  return (
    <div>
      <Flex justify="flex-end">
        <EventFilter />
      </Flex>
      <Space h={20} />
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, md: 3, xl: 4 }}>
        <EventHorizontialCard />
        <EventHorizontialCard />
        <EventHorizontialCard />
        <EventHorizontialCard />
        <EventHorizontialCard />
        <EventHorizontialCard />
        <EventHorizontialCard />
      </SimpleGrid>
    </div>
  );
};

export default EventPage;
