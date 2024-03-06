"use client";
import { getEventListRequest } from "@/api/event";
import { EventSlider, MapMarker } from "@/components/map";
import { QUERY_KEY } from "@/constant/query-key";
import { useAppShellMainStore } from "@/store/app-shell-main.store";
import { useEventListParamStore } from "@/store/event-list.store";
import { useQuery } from "@tanstack/react-query";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  limitTiltRange,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@mantine/core";
import { Easing, Tween, update } from "@tweenjs/tween.js";

const INITIAL_CAMERA = {
  center: { lat: 21.057947234310472, lng: 105.79094582747298 },
  zoom: 12,
};

const NEW_CAMERA = {
  center: { lat: 10.284458390020472, lng: 105.9610495200977 },
  zoom: 12,
};

// export const DeckGlOverlay = ({ layers }) => {
//   const deck = useMemo(() => new GoogleMapsOverlay({ interleaved: true }), []);

//   const map = useMap();
//   useEffect(() => deck.setMap(map), [map, deck]);
//   useEffect(() => deck.setProps({ layers }), [deck, layers]);

//   // no dom rendered by this component
//   return null;
// };

const EventMapPage = () => {
  const { size } = useAppShellMainStore();
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    setCameraProps(ev.detail);
  }, []);

  const handleGoto = () => {
    new Tween(cameraProps)
      .to(NEW_CAMERA, 1000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        setCameraProps(NEW_CAMERA);
      })
      .start();
    function animate() {
      requestAnimationFrame(animate);
      update();
    }

    animate();
  };
  const handleBackto = () => {
    new Tween(cameraProps)
      .to(INITIAL_CAMERA, 1000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        setCameraProps(INITIAL_CAMERA);
      })
      .start();
    function animate(time: number) {
      requestAnimationFrame(animate);
      update(time);
    }

    requestAnimationFrame(animate);
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
          ></Map>
          <Button onClick={handleGoto}>go to</Button>
          <Button onClick={handleBackto}>back to</Button>
        </APIProvider>
      </div>
    </>
  );
};

export default EventMapPage;
