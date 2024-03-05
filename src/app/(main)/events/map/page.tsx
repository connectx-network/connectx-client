"use client";
import { getEventListRequest } from "@/api/event";
import { EventSlider, MapMarker } from "@/components/map";
import { QUERY_KEY } from "@/constant/query-key";
import { useAppShellMainStore } from "@/store/app-shell-main.store";
import { useEventListParamStore } from "@/store/event-list.store";
import { useQuery } from "@tanstack/react-query";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Button, Flex, Image, Stack, Text, Title } from "@mantine/core";
import { Icons } from "@/components/icons";
import dayjs from "dayjs";
import { Easing, Tween, update } from "@tweenjs/tween.js";

const INITIAL_CAMERA = {
  center: { lat: 21.0278, lng: 105.8342 },
  zoom: 12,
};

const EventMapPage = () => {
  const map = useMap();
  const { size } = useAppShellMainStore();
  const { param } = useEventListParamStore();
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    setCameraProps(ev.detail);
  }, []);

  const [activeMarker, setActiveMarker] = useState("");

  const { data: eventListData, isFetchedAfterMount } = useQuery({
    queryKey: [QUERY_KEY.GET_EVENT_LIST, param],
    queryFn: () => getEventListRequest(param),
  });

  // useEffect(() => {
  //   if (!map) return;
  //   console.log("😻 ~ useEffect sss~ map:", map);

  //   // do something with the map instance
  // }, [map]);

  // const handleEventSlideChange = useCallback(
  //   (index: number) => {
  //     setActiveMarker(String(eventListData?.data[index].id));
  //     setCameraProps((prev) => ({
  //       ...prev,
  //       center: {
  //         lat: Number(eventListData?.data[index].eventLocationDetail.latitude),
  //         lng: Number(eventListData?.data[index].eventLocationDetail.longitude),
  //       },
  //     }));
  //     // new Tween(cameraProps)
  //     //   .to(
  //     //     {
  //     //       center: {
  //     //         lat: Number(
  //     //           eventListData?.data[index].eventLocationDetail.latitude
  //     //         ),
  //     //         lng: Number(
  //     //           eventListData?.data[index].eventLocationDetail.longitude
  //     //         ),
  //     //       },
  //     //       zoom: 12,
  //     //     },
  //     //     1000
  //     //   )
  //     //   .easing(Easing.Quadratic.Out)
  //     //   .onUpdate(() => {
  //     //     map?.moveCamera(cameraProps);
  //     //   })
  //     //   .start();
  //     console.log("😻 ~ handleEventSlideChange ~ cameraProps", map);
  //   },
  //   [map, cameraProps, eventListData]
  // );

  useEffect(() => {
    if (isFetchedAfterMount && eventListData) {
      setActiveMarker(eventListData?.data[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchedAfterMount]);

  const handleGoto = () => {
    const tween = new Tween(cameraProps)
      .to(
        {
          center: {
            lat: 21.041723643758335,
            lng: 105.809951011605,
          },
          zoom: 12,
        },
        1000
      )
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        setCameraProps({
          center: {
            lat: 21.041723643758335,
            lng: 105.809951011605,
          },
          zoom: 12,
        });
      });
    console.log("😻 ~ handleGoto ~ tween", tween);
    tween.start();
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
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
            mapTypeControl={false}
            zoomControl={false}
            fullscreenControl={false}
            keyboardShortcuts={false}
            {...cameraProps}
            onCameraChanged={handleCameraChange}
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
                }}
                active={event.id === activeMarker}
              />
            ))}
          </Map>
          <Button onClick={handleGoto}>go to</Button>
          {eventListData && (
            <EventSlider
              event={eventListData?.data}
              cameraProps={cameraProps}
            />
          )}
        </APIProvider>
      </div>
    </>
  );
};

export default EventMapPage;
