import { createContext, useContext } from "react";

import { useFetch } from "@common/hooks";

import { BASE_URL } from "@assets/helper";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, isLoading] = useFetch(BASE_URL, "cities");

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
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
