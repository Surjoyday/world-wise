import { useState } from "react";

export function useGeolocation(onSetPosition, defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function getMyGeolocation() {
    if (!navigator.geolocation) {
      return setError("Your browser does not support geolocation");
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (success) => {
        setPosition({
          lat: success.coords.latitude,
          lng: success.coords.longitude,
        });
        onSetPosition({
          lat: success.coords.latitude,
          lng: success.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { position, getMyGeolocation, error, isLoading };
}
