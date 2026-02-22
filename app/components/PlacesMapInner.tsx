"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// SAFE MAP FOCUS COMPONENT
function MapFocus({ place }: any) {
  const map = useMap();

  useEffect(() => {
    if (!place) return;

    const lat = Number(place?.lat);
    const lng = Number(place?.lng);

    if (isNaN(lat) || isNaN(lng)) return;

    map.flyTo([lat, lng], 14, {
      animate: true,
      duration: 1.5,
    });
  }, [place, map]);

  return null;
}

export default function PlacesMapInner({
  places,
  selectedPlace,
}: any) {
  const center =
    places?.length > 0 &&
    !isNaN(Number(places[0]?.lat)) &&
    !isNaN(Number(places[0]?.lng))
      ? [Number(places[0].lat), Number(places[0].lng)]
      : [9.5, 76.3];

  return (
    <MapContainer
      center={center as any}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapFocus place={selectedPlace} />

      {places.map((p: any, i: number) => {
        const lat = Number(p.lat);
        const lng = Number(p.lng);

        if (isNaN(lat) || isNaN(lng)) return null;

        return (
          <Marker key={i} position={[lat, lng]}>
            <Popup>
              <div>
                <strong>{p.name}</strong>
                <p>{p.type}</p>
                <p className="text-sm text-gray-500">
                  {p.description}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}