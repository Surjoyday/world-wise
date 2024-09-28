import { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "@maincontext/CityContext";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
  useMapEvent,
} from "react-leaflet";
import { useGeoLocation, useUrlPosition } from "@common/hooks";
import { Button } from "@common/components";

function Map() {
  const navigate = useNavigate();
  const { cities } = useCities();
  const [{ lat, lng }, setSearchParams] = useUrlPosition(); // Using the custom hook to get the Query string data from the URL
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const { isLoading, error, geoLocationPosition, getPosition } =
    useGeoLocation(setMapPosition); // passing the setter function of the mapPosition to set the current loaction as the map position when current location is clicked

  /*   const lat = searchParams.get("lat");
  const lng = searchParams.get("lng"); */

  // Effect to update current `mapPosition` to whatever the the lat/lng query params is. This prevents the map from resetting to the initial position when the query parameters (lat, lng) are updated or not present in the URL.
  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button
          type="position"
          onClick={() => {
            getPosition();
            navigate(`/app/cities`); // Using this so that if any of the current city from the list of cities is clicked and it details is showing it will remove that
          }}
        >
          {isLoading ? "Loading" : "Use current position"}
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
        {cities.map(({ cityName, emoji, id, position: { lat, lng } }) => (
          <Fragment key={id}>
            <Marker position={[lat, lng]}>
              <Popup>
                <span>{emoji}</span>
                <span>{cityName}</span>
              </Popup>
            </Marker>
          </Fragment>
        ))}
        {/* CUSTOM COMPONENTS FOR FUNCTIONALITY */}
        <Circle center={mapPosition} radius={10000} />
        <UpdateMapPosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function UpdateMapPosition({ position }) {
  const map = useMap(); // using "useMap" we get direct access to the instance of the MapConatiner Component and in that we ca pass a different values for center, zoom , etc.

  // map.setView(position, 10); // 10 is zoom value
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      // console.log(e);
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}

export default Map;
