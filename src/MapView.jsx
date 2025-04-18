// frontend/src/MapView.jsx
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Circle,
  Popup
} from 'react-leaflet';

export default function MapView({ path, tasks }) {
  // Convert [lon, lat] → [lat, lon] for Leaflet
  const latlngs = path.map(([lon, lat]) => [lat, lon]);
  // Center on the first point, or a sensible default
  const center = latlngs.length
    ? latlngs[0]
    : [46.7767666667, 13.1496414141];

  return (
    <MapContainer center={center} zoom={12} style={{ height: '80vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Computed route */}
      {latlngs.length > 1 && (
        <Polyline positions={latlngs} color="red" weight={3} />
      )}

      {/* Task waypoints */}
      {tasks.map(({ key, lat, lon, radius }) => (
        <React.Fragment key={key}>
          <Marker position={[lat, lon]}>
            <Popup>{key}</Popup>
          </Marker>
          {radius > 0 && (
            <Circle
              center={[lat, lon]}
              radius={radius}
              pathOptions={{ color: 'blue', fillOpacity: 0.1 }}
            />
          )}
        </React.Fragment>
      ))}
    </MapContainer>
  );
}
