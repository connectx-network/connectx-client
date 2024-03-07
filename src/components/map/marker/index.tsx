"use client";
import { Image } from "@mantine/core";
import classes from "./marker.module.css";
import { AdvancedMarker, AdvancedMarkerProps } from "@vis.gl/react-google-maps";
import { useAutoAnimate } from "@formkit/auto-animate/react";
type MapMarkerProps = AdvancedMarkerProps & {
  event: {
    name: string;
    image: string;
  };
  active: boolean;
};
const MapMarker = (props: MapMarkerProps) => {
  const { event, position, active } = props;
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 300,
    easing: "ease",
  });
  return (
    <AdvancedMarker position={position}>
      <div
        className={`${classes.container} ${active ? classes.active : ""}`}
        ref={parent}
      >
        <Image
          src={event.image}
          alt={event.name}
          style={{ width: 50, height: 50 }}
          radius={8}
        />
      </div>
    </AdvancedMarker>
  );
};

export default MapMarker;
