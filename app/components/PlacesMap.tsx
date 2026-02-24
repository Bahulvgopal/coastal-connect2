"use client";

import dynamic from "next/dynamic";

const MapInner = dynamic(
  () => import("./PlacesMapInner"),
  {
    ssr: false,
  }
);

export default function PlacesMap(props: any) {
  return <MapInner {...props} />;
}