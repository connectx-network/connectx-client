"use client";
import { Flex, SimpleGrid, Space, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { EventFilter, EventHorizontialCard } from "@/components/event";
import { QUERY_KEY } from "@/constant/query-key";
import { useEventListParamStore } from "@/store/event-list.store";
import { getEventListRequest } from "@/api/event";

const EventPage = () => {
  const { param } = useEventListParamStore();
  const { data: eventListData } = useQuery({
    queryKey: [QUERY_KEY.GET_EVENT_LIST, param],
    queryFn: () => getEventListRequest(param),
  });
  return (
    <div>
      <Flex justify="space-between">
        <Text fz={24}>Events</Text>
        <EventFilter />
      </Flex>
      <Space h={20} />
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
    </div>
  );
};

export default EventPage;
