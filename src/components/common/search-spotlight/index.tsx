"use client";
import { ActionIcon, Image, Kbd, Tooltip } from "@mantine/core";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";

import { Icons } from "@/components/icons";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constant/query-key";
import { getEventListRequest } from "@/api/event";
import { useMemo, useState } from "react";
import { EventListParam } from "@/types/event";
import { useRouter } from "next/navigation";
import classes from "./search-spotlight.module.css";

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

  const searchResults: SpotlightActionData[] = useMemo(() => {
    if (!data) return [];
    return data.data.map((event) => ({
      id: event.id,
      label: event.name,
      description: event.description,
      onClick: () => {
        router.push(`/event/${event.id}`);
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
      <Tooltip
        label={
          <div dir="ltr" className="text-black">
            <Kbd>⌘</Kbd>/<Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
          </div>
        }
        position="left"
        color="rgba(255, 255, 255, 1)"
      >
        <ActionIcon
          variant="subtle"
          c="gray"
          size="lg"
          radius={50}
          onClick={spotlight.open}
        >
          <Icons.search />
        </ActionIcon>
      </Tooltip>
      <Spotlight
        actions={searchResults}
        nothingFound="Nothing found..."
        highlightQuery
        onQueryChange={handleQueryChange}
        searchProps={{
          placeholder: "Search...",
        }}
        classNames={classes}
      />
    </>
  );
};

export default SearchSpotlight;
