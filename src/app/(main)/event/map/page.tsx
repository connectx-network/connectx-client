"use client";
import { MapMarker } from "@/components/map";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
const eventData = [
  {
    name: "Moscow Welcomes Blockchain As CRYPTO EXPO MOSCOW",
    image:
      "https://i0.wp.com/coinsutra.com/wp-content/uploads/2022/06/4.-Crypto-Events-2022-Metaweek.webp?resize=1200%2C686&ssl=1",
    date: "12/03/2024",
    position: {
      lat: 21.019510273651107,
      lng: 105.82781240085498,
    },
  },
  {
    name: "Thailand to Host Southeast Asia's Largest Cryptocurrency Expo",
    image:
      "https://image.cnbcfm.com/api/v1/image/107042891-16492696702022-04-06t182428z_1844520444_rc2nht9efd1n_rtrmadp_0_usa-bitcoin-conference.jpeg?v=1668545712",
    date: "12/03/2024",
    position: {
      lat: 21.029904242320267,
      lng: 105.85464768004076,
    },
  },
  {
    name: "Crypto Expo to Go Global in 2023 - UNLOCK Blockchain",
    image: "https://bitcoinist.com/wp-content/uploads/2022/08/crypto.com-.jpg",
    date: "12/03/2024",
    position: {
      lat: 21.024689540337583,
      lng: 105.8453555378917,
    },
  },
  {
    name: "Crypto Business World (CBW) is a quality fintech media ",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF4bMy93yldEEgmspbQ6gkNVqNVbABlKwUmQ&usqp=CAU",
    date: "12/03/2024",
    position: {
      lat: 21.018704368053246,
      lng: 105.84813151333155,
    },
  },
  {
    name: "TOKEN2049 DUBAI 2024: The Premier Crypto Event Comes to the UAE",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xnZd-VmpWyOwZK5C6Rp8mTUkgQMKrtgn_w&usqp=CAU",
    date: "12/03/2024",
    position: {
      lat: 21.01549524739749,
      lng: 105.8442252537391,
    },
  },
];
const EventMapPage = () => {
  return (
    <>
      <div style={{ height: "70vh", width: "100%" }}>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultZoom={13}
            defaultCenter={{
              lat: 21.0278,
              lng: 105.8342,
            }}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
          >
            {eventData.map((event) => (
              <MapMarker
                event={{
                  name: event.name,
                  image: event.image,
                  date: event.date,
                }}
                position={event.position}
              />
            ))}
          </Map>
        </APIProvider>
      </div>
    </>
  );
};

export default EventMapPage;
