import { createContext, useContext, useMemo, useState } from "react";

import { useFetch } from "@common/hooks";

import { BASE_URL } from "@assets/helper";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  // Storing the data about the city data that was clicked in here beacuse the clicked city data is needed in many components and so it will be accessible from here
  const [currentCity, setCurrentCity] = useState({});

  const [cities, isLoading] = useFetch(BASE_URL, "cities");

  const sharedData = useMemo(() => {
    return { cities, isLoading, currentCity, setCurrentCity };
  }, [cities, currentCity, isLoading]);

  return (
    <CitiesContext.Provider value={sharedData}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");

  return context;
}

export { useCities, CitiesProvider };
