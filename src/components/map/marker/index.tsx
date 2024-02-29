"use client";
import { Flex, Image, Stack, Text } from "@mantine/core";
import classes from "./marker.module.css";
import { useDisclosure } from "@mantine/hooks";
import { AdvancedMarker, AdvancedMarkerProps } from "@vis.gl/react-google-maps";
import { useAutoAnimate } from "@formkit/auto-animate/react";
type MapMarkerProps = AdvancedMarkerProps & {
  event: {
    name: string;
    image: string;
    date: string;
  };
};
const MapMarker = (props: MapMarkerProps) => {
  const { event, position } = props;
  const [opened, { toggle }] = useDisclosure();
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 300,
    easing: "ease",
  });
  return (
    <AdvancedMarker onClick={toggle} position={position}>
      <div className={classes.container} ref={parent}>
        {opened ? (
          <Flex gap={8} align="center">
            <Image
              src={event.image}
              alt={event.name}
              style={{ width: 50, height: 50 }}
              radius={8}
            />
            <Stack gap={2}>
              <Text fz={12} c="gray">
                {event.date}
              </Text>
              <Text fz={14} fw={700}>
                {event.name}
              </Text>
            </Stack>
          </Flex>
        ) : (
          <Image
            src={event.image}
            alt={event.name}
            style={{ width: 50, height: 50 }}
            radius={8}
          />
        )}
      </div>
    </AdvancedMarker>
  );
};

export default MapMarker;
