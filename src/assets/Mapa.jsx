import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Mapa({ countries, onCountryClick }) {
  const [worldGeoJSON, setWorldGeoJSON] = useState(null);

  useEffect(() => {
    fetch('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson')
      .then(response => response.json())
      .then(data => {
        setWorldGeoJSON(data);
      });
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {worldGeoJSON && (
        <GeoJSON
          data={worldGeoJSON}
          onEachFeature={(feature, layer) => {
            const countryCode = feature.properties.ISO_A2;
            if (countryCode && countries.includes(countryCode.toLowerCase())) {
              layer.on({ click: () => onCountryClick(feature.properties.ADMIN) });
            }
          }}
        />
      )}
    </MapContainer>
  );
}

export default Mapa;
