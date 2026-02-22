"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./PlacesMapInner"), {
  ssr: false,
});

export default function MapView({ selectedPlace }: any) {
  return <Map selectedPlace={selectedPlace} />;
}