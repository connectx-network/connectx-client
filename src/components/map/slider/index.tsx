"use client";
import { Flex, Image, Stack, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { EventListResponse } from "@/types/event";
import dayjs from "dayjs";
import { Icons } from "@/components/icons";
import { MapCameraProps, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect } from "react";
import { Easing, Tween, update } from "@tweenjs/tween.js";

type SliderEventProps = {
  event: EventListResponse[];
  cameraProps: MapCameraProps;
};

const SliderEvent = (props: SliderEventProps) => {
  const { event, cameraProps } = props;

  const map = useMap();

  useEffect(() => {
    if (!map) return;
  }, [map]);

  const handleEventSlideChange = useCallback(
    (index: number) => {
      new Tween(cameraProps)
        .to(
          {
            center: {
              lat: Number(event[index].eventLocationDetail.latitude),
              lng: Number(event[index].eventLocationDetail.longitude),
            },
            zoom: 12,
          },
          1000
        )
        .easing(Easing.Quadratic.Out)
        .onUpdate(() => {
          map?.moveCamera(cameraProps);
        })
        .start();
    },
    [map, event, cameraProps]
  );

  return (
    <>
      {event && (
        <Carousel
          slideSize="30%"
          height={150}
          slideGap="lg"
          loop
          withControls={false}
          withIndicators
          style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
          onSlideChange={handleEventSlideChange}
        >
          {event?.map((event, index) => (
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
    </>
  );
};

export default SliderEvent;
