"use client";
import { getEventListRequest } from "@/api/event";
import { CurrentLocationMark, MapMarker } from "@/components/map";
import { QUERY_KEY } from "@/constant/query-key";
import { useAppShellMainStore } from "@/store/app-shell-main.store";
import { useEventListParamStore } from "@/store/event-list.store";
import { useQuery } from "@tanstack/react-query";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Autocomplete,
  AutocompleteProps,
  CloseButton,
  Flex,
  Image,
  Stack,
  Text,
  Title,
  useComputedColorScheme,
} from "@mantine/core";
import { Icons } from "@/components/icons";
import dayjs from "dayjs";
import { showErrorNotification } from "@/utils";
import { IconCurrentLocation } from "@tabler/icons-react";
import { MAIN_LAYOUT } from "@/constant";
import NextImage from "next/image";
import { EventAssetType } from "@/types/event";
const INITIAL_CAMERA = {
  center: { lat: 21.0278, lng: 105.8342 },
  zoom: 13,
};

const EventMapPage = () => {
  const { size } = useAppShellMainStore();
  const { param } = useEventListParamStore();
  const computedColorScheme = useComputedColorScheme();
  const [searchEvent, setSearchEvent] = useState("");
  const isDarkMode = computedColorScheme === "dark";
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  const [currentLocation, setCurrentLocation] = useState<MapCameraProps | null>(
    null
  );
  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    setCameraProps(ev.detail);
  }, []);

  const [activeMarker, setActiveMarker] = useState("");

  const { data: eventListData, isFetchedAfterMount } = useQuery({
    queryKey: [QUERY_KEY.GET_EVENT_LIST, param],
    queryFn: () => getEventListRequest(param),
  });

  const handleEventSlideChange = useCallback(
    (index: number) => {
      setActiveMarker(String(eventListData?.data[index].id));
      setCameraProps((prev) => ({
        ...prev,
        center: {
          lat: Number(eventListData?.data[index].eventLocationDetail.latitude),
          lng: Number(eventListData?.data[index].eventLocationDetail.longitude),
        },
        zoom: 15,
      }));
    },
    [eventListData]
  );

  const handleSelectEvent = (value: string) => {
    const event = eventListData?.data.find((event) => event.name === value);
    if (event) {
      setActiveMarker(event.id);
      setCameraProps((prev) => ({
        ...prev,
        center: {
          lat: Number(event.eventLocationDetail.latitude),
          lng: Number(event.eventLocationDetail.longitude),
        },
        zoom: 15,
      }));
    }
  };

  const dataEventAutocomplete = useMemo(() => {
    if (!eventListData) return [];
    return eventListData.data.map((event) => event.name);
  }, [eventListData]);

  const dataEventOptions: Record<
    string,
    { image: string; name: string; location: string }
  > = useMemo(() => {
    if (!eventListData) return {};
    return eventListData.data.reduce((acc, event) => {
      const backgroundImage =
        event.eventAssets?.find(
          (item) => item.type === EventAssetType.BACKGROUND
        )?.url || "";
      acc[event.name] = {
        image: backgroundImage,
        name: event.name || "",
        location: event.location || "",
      };
      return acc;
    }, {} as Record<string, { image: string; name: string; location: string }>);
  }, [eventListData]);

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => {
    return (
      <Flex gap="sm">
        <Image
          src={dataEventOptions[option.value].image}
          alt={dataEventOptions[option.value].name}
          w={56}
          h={56}
        />
        <div>
          <Text size="sm" lineClamp={1}>
            {dataEventOptions[option.value].name}
          </Text>
          <Text size="xs" opacity={0.5} lineClamp={1}>
            {dataEventOptions[option.value].location}
          </Text>
        </div>
      </Flex>
    );
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCameraProps((prev) => ({
            ...prev,
            center,
          }));
          setCurrentLocation({
            center,
            zoom: 13,
          });
        },
        () => {
          showErrorNotification({
            title: "Location",
            message: "User denied the request for Geolocation.",
          });
        }
      );
    } else {
      showErrorNotification({
        title: "Location",
        message: "Geolocation is not supported by this browser.",
      });
    }
  };

  useEffect(() => {
    if (isFetchedAfterMount && eventListData) {
      setActiveMarker(eventListData?.data[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchedAfterMount]);

  return (
    <>
      <div
        style={{
          height: `calc(100vh - ${MAIN_LAYOUT.HEADER_HEIGHT} - ${
            MAIN_LAYOUT.PADDING * 2
          }px)`,
          width: "100%",
          position: "relative",
        }}
      >
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
            mapTypeControl={false}
            zoomControl={false}
            fullscreenControl={false}
            keyboardShortcuts={false}
            {...cameraProps}
            onCameraChanged={handleCameraChange}
          >
            {eventListData?.data.map((event, index) => {
              const backgroundImage =
                event.eventAssets?.find(
                  (item) => item.type === EventAssetType.BACKGROUND
                )?.url || "";
              return (
                <MapMarker
                  key={index}
                  event={{
                    name: event.name,
                    image: backgroundImage,
                  }}
                  position={{
                    lat: Number(event.eventLocationDetail.latitude),
                    lng: Number(event.eventLocationDetail.longitude),
                  }}
                  active={event.id === activeMarker}
                />
              );
            })}
            {currentLocation && (
              <CurrentLocationMark
                position={{
                  lat: currentLocation.center.lat,
                  lng: currentLocation.center.lng,
                }}
              />
            )}
            <div className="px-8 flex justify-center">
              <Autocomplete
                max={330}
                miw={330}
                size="lg"
                data={dataEventAutocomplete}
                renderOption={renderAutocompleteOption}
                maxDropdownHeight={300}
                label="Find event"
                placeholder="Find event"
                onOptionSubmit={handleSelectEvent}
                comboboxProps={{ shadow: "md" }}
                value={searchEvent}
                onChange={setSearchEvent}
                rightSection={
                  <CloseButton
                    aria-label="Clear input"
                    onClick={() => setSearchEvent("")}
                    style={{ display: searchEvent ? undefined : "none" }}
                  />
                }
                styles={{
                  input: {
                    backgroundColor: isDarkMode ? "#29313E" : "#fff",
                  },
                }}
              />
            </div>
          </Map>
          <ActionIcon
            variant="fill"
            size="xl"
            onClick={handleGetCurrentLocation}
            radius={50}
            p={4}
            style={{
              position: "absolute",
              bottom: "25%",
              right: "16px",
              backgroundColor: "#fff",
            }}
          >
            <IconCurrentLocation className="text-[#5669ff]" />
          </ActionIcon>
        </APIProvider>
        {eventListData && (
          <Carousel
            slideSize={{
              base: "80%",
              xs: "80%",
              sm: "80%",
              md: "50%",
              lg: "40%",
              xl: "30%",
            }}
            height={150}
            slideGap="lg"
            loop
            withControls={false}
            withIndicators
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            onSlideChange={handleEventSlideChange}
          >
            {eventListData?.data.map((event, index) => {
              const backgroundImage =
                event.eventAssets?.find(
                  (item) => item.type === EventAssetType.BACKGROUND
                )?.url || "";
              return (
                <Carousel.Slide
                  key={index}
                  style={{
                    width: "100%",
                    height: "100px",
                  }}
                >
                  <Flex
                    pos="relative"
                    align="center"
                    style={{
                      borderRadius: "16px",
                      backgroundColor: "#29313E",
                      border:
                        activeMarker === event.id
                          ? `1px solid #5669ff`
                          : "none",
                    }}
                  >
                    <Image
                      src={backgroundImage}
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
                        <Text fz={12} c="rgba(255, 255, 255, 1)">
                          {dayjs(event.eventDate).format("DD/MM/YYYY")}
                        </Text>
                        <Title
                          order={6}
                          lineClamp={2}
                          h={42}
                          c="rgba(255, 255, 255, 1)"
                        >
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
                    {/* <UnstyledButton
                    style={{ position: "absolute", top: 8, right: 12 }}
                  >
                    <Text fz={10} c={"grape"} td="underline">
                      Go to location
                    </Text>
                  </UnstyledButton> */}
                  </Flex>
                </Carousel.Slide>
              );
            })}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default EventMapPage;
