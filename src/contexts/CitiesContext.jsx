import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // Fetch ALL the cities available
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        if (!response.ok) throw new Error("Error fetching cities list -- 400");

        const data = await response.json();
        setCities(data);
      } catch (err) {
        alert(`${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // Fetch INDIVIDUAL City details
  async function fetchCurrentCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      if (!response.ok) throw new Error("Error fetching City Details -- 400");

      const data = await response.json();

      // console.log(data);

      setCurrentCity(data);
    } catch (err) {
      alert(`${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  // ADD New City to cities list - POST REQUEST

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error ADDING New City -- 400");

      const data = await response.json();

      console.log(data);
      setCities((cities) => [...cities, data]);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, fetchCurrentCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the Cities Provider");

  return context;
}

export { CitiesProvider, useCitiesContext };
