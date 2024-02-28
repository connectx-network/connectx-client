"use client";
import { EventFilter, EventHorizontialCard } from "@/components/event";
import { SimpleGrid, Space } from "@mantine/core";

const EventPage = () => {
  return (
    <div>
      <EventFilter />
      <Space h={40} />
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, xl: 4 }}>
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
