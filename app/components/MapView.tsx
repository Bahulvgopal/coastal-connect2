"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

type Place = {
  name: string;
  lat: number;
  lng: number;
};

type Props = {
  selectedPlace?: Place;
  places?: Place[];
};

export default function PlacesMapInner({ selectedPlace, places }: Props) {
  const defaultCenter: [number, number] = [10.8505, 76.2711]; // Kerala

  const center: [number, number] =
    selectedPlace?.lat && selectedPlace?.lng
      ? [selectedPlace.lat, selectedPlace.lng]
      : defaultCenter;

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Single selected place */}
      {selectedPlace && (
        <Marker
          position={[selectedPlace.lat, selectedPlace.lng]}
          icon={markerIcon}
        >
          <Popup>{selectedPlace.name}</Popup>
        </Marker>
      )}

      {/* Multiple places support */}
      {places &&
        places.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]} icon={markerIcon}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}