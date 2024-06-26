"use client";
import { Flex, Image, Kbd, Text, useComputedColorScheme } from "@mantine/core";
import {
  Spotlight,
  SpotlightActionData,
  createSpotlight,
} from "@mantine/spotlight";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/query-key";
import { getEventListRequest } from "@/api/event";
import { useMemo, useState } from "react";
import { EventListParam } from "@/types/event";
import { useRouter } from "next/navigation";
import classes from "./search-spotlight.module.css";
import { ROUTER } from "@/constant";
import { IconSearch } from "@tabler/icons-react";

export const [eventSearchStore, eventSearchSpotlight] = createSpotlight();

const SearchSpotlight = () => {
  const router = useRouter();
  const [spotlightParam, setSpotlightParam] = useState<EventListParam>({
    page: 1,
    size: 20,
  });
  const { data } = useQuery({
    queryKey: [QUERY_KEY.GET_EVENT_LIST, spotlightParam],
    queryFn: () => getEventListRequest(spotlightParam),
  });

  const handleQueryChange = (query: string) => {
    setSpotlightParam((prev) => ({ ...prev, query }));
  };

  const computedColorScheme = useComputedColorScheme();

  const searchResults: SpotlightActionData[] = useMemo(() => {
    if (!data) return [];
    return data.data.map((event) => ({
      id: event.id,
      label: event.name,
      description: event.description,
      onClick: () => {
        router.push(`${ROUTER.EVENT}/${event.id}`);
      },
      leftSection: (
        <Image
          src={event.eventAssets?.[0]?.url}
          alt={event.name}
          w={72}
          h={72}
          radius={4}
        />
      ),
    }));
  }, [data, router]);
  return (
    <>
      <Spotlight
        actions={searchResults}
        store={eventSearchStore}
        nothingFound="Nothing found..."
        highlightQuery
        onQueryChange={handleQueryChange}
        searchProps={{
          placeholder: "Search event...",
        }}
        classNames={classes}
      />
    </>
  );
};

export default SearchSpotlight;
