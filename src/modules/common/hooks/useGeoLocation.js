import { useState } from "react";

function useGeoLocation(onSetPosition, defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geoLocationPosition, setGeoLocationPosition] =
    useState(defaultPosition);

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("Your browser does not support geoloaction");
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // console.log(pos);
        const { latitude: lat, longitude: lng } = pos.coords;
        setGeoLocationPosition({ lat, lng });
        onSetPosition?.([lat, lng]); // using array as MapContainer accepts position as an Array
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, error, geoLocationPosition, getPosition };
}

export default useGeoLocation;
