"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface Place {
  name: string;
  lat: number;
  lng: number;
}

export default function PlacesMapInner({
  places,
}: {
  places: Place[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fix marker icon issue
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  if (!mounted) return null;

  // ✅ Safety checks for invalid data
  if (
    !places ||
    places.length === 0 ||
    typeof places[0].lat !== "number" ||
    typeof places[0].lng !== "number" ||
    isNaN(places[0].lat) ||
    isNaN(places[0].lng)
  ) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        📍 Location not available
      </div>
    );
  }

  const center: [number, number] = [
    places[0].lat,
    places[0].lng,
  ];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((p, i) => {
        if (
          typeof p.lat !== "number" ||
          typeof p.lng !== "number" ||
          isNaN(p.lat) ||
          isNaN(p.lng)
        )
          return null;

        return (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>{p.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}