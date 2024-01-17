import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export const PuertoRicoMap = () => {
  const position = [18.2208, -66.5901]; // coordinates for Puerto Rico
  return (
    <MapContainer center={position} zoom={9} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Puerto Rico</Popup>
      </Marker>
    </MapContainer>
  );
};
