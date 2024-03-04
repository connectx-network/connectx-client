"use client";
import { getEventListRequest } from "@/api/event";
import { MapMarker } from "@/components/map";
import { QUERY_KEY } from "@/constant/query-key";
import { useAppShellMainStore } from "@/store/app-shell-main.store";
import { useEventListParamStore } from "@/store/event-list.store";
import { useQuery } from "@tanstack/react-query";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Flex, Image, Stack, Text, Title } from "@mantine/core";
import { Icons } from "@/components/icons";
import dayjs from "dayjs";

const EventMapPage = () => {
  const { size } = useAppShellMainStore();
  const { param } = useEventListParamStore();
  const [location, setLocation] = useState({
    lat: 21.0278,
    lng: 105.8342,
    zoom: 13,
  });

  const { data: eventListData } = useQuery({
    queryKey: [QUERY_KEY.GET_EVENT_LIST, param],
    queryFn: () => getEventListRequest(param),
  });

  const handleCenterChanged = (e: MapCameraChangedEvent) => {
    setLocation({
      lat: Number(e.map.getCenter()?.lat()),
      lng: Number(e.map.getCenter()?.lng()),
      zoom: 13,
    });
  };

  const handleEventSlideChange = (index: number) => {
    setLocation({
      lat: Number(eventListData?.data[index].eventLocationDetail.latitude),
      lng: Number(eventListData?.data[index].eventLocationDetail.longitude),
      zoom: 13,
    });
  };

  return (
    <>
      <div
        style={{
          height: `${size.height}px`,
          width: "100%",
          position: "relative",
        }}
      >
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultZoom={13}
            defaultCenter={{
              lat: 21.0278,
              lng: 105.8342,
            }}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
            center={location}
            onCenterChanged={handleCenterChanged}
            mapTypeControl={false}
            zoomControl={false}
            fullscreenControl={false}
            keyboardShortcuts={false}
          >
            {eventListData?.data.map((event, index) => (
              <MapMarker
                key={index}
                event={{
                  name: event.name,
                  image: event.eventAssets?.[0]?.url,
                }}
                position={{
                  lat: Number(event.eventLocationDetail.latitude),
                  lng: Number(event.eventLocationDetail.longitude),
                  zoom: 13,
                }}
              />
            ))}
          </Map>
        </APIProvider>
        {eventListData && (
          <Carousel
            slideSize="90%"
            height={150}
            slideGap="lg"
            loop
            withControls={false}
            withIndicators
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            onSlideChange={handleEventSlideChange}
          >
            {eventListData?.data?.map((event, index) => (
              <Carousel.Slide
                key={index}
                style={{
                  width: "100%",
                  height: "100px",
                }}
              >
                <Flex
                  align="center"
                  style={{
                    borderRadius: "16px",
                    backgroundColor: "white",
                  }}
                >
                  <Image
                    src={event.eventAssets?.[0]?.url}
                    alt={event.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginLeft: "8px",
                    }}
                  />
                  <Flex
                    direction="column"
                    justify="space-between"
                    align="flex-start"
                    gap={20}
                    p={8}
                  >
                    <Stack gap={4}>
                      <Text fz={12}>
                        {dayjs(event.eventDate).format("LT - DD/MM/YYYY")}
                      </Text>
                      <Title order={6} lineClamp={2}>
                        {event.name}
                      </Title>
                    </Stack>
                    <Flex gap={8} align="center">
                      <Icons.location />
                      <Text c="gray" fz={12} lineClamp={1}>
                        {event.location}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Carousel.Slide>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default EventMapPage;
