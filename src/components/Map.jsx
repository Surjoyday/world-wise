import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

export default function Map() {
  const { cities } = useCitiesContext();
  const [mapPosition, setMapPosition] = useState([26.12, 91.71]);
  const [searchParams] = useSearchParams();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getMyGeolocation,
  } = useGeolocation(setMapPosition);

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getMyGeolocation}>
          {isLoadingPosition ? "Loading...." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(({ position, id, emoji, cityName }) => (
          <Marker position={[position.lat, position.lng]} key={id}>
            <Popup>
              <span>{emoji}</span> <span>{cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      console.log(e);

      // Data coming from leaflet
      const {
        latlng: { lat, lng },
      } = e;

      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}
