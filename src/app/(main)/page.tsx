"use client";
import { EventCard } from "@/components/event";
import { SimpleGrid } from "@mantine/core";

const Main = () => {
  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </SimpleGrid>
    </div>
  );
};
export default Main;
