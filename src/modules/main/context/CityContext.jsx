import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { BASE_URL, fetchDataFromApi } from "@common/utils";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  errorMsg: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "error/loading":
      return { ...state, isLoading: false, errorMsg: action.payload };

    default:
      throw new Error("Unknown action in CitiesContext");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, errorMsg }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const result = await fetchDataFromApi(BASE_URL, "/cities");
        dispatch({ type: "cities/loaded", payload: result });
      } catch (err) {
        const errorMessage = err.message;
        console.log(errorMessage);
        dispatch({ type: "error/loading", payload: errorMessage });
      }
    }
    fetchCities();
  }, []);

  const fetchCityDetails = useCallback(
    async (id) => {
      if (id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const result = await fetchDataFromApi(BASE_URL, `/cities/${id}`);
        dispatch({ type: "city/loaded", payload: result });
      } catch (err) {
        const errorMessage = err.message;
        console.log(errorMessage);
        dispatch({ type: "error/loading", payload: errorMessage });
      }
    },
    [currentCity.id] // including currentCity.id in the dependency array ensures that the function will be re-created whenever the value of currentCity.id changes, which is necessary for the id === currentCity.id check to work properly. Without this, the check would operate on an outdated currentCity.id, potentially causing incorrect results.
  );

  return (
    <CitiesContext.Provider
      value={{ cities, currentCity, isLoading, errorMsg, fetchCityDetails }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside of CitiesProvider");

  return context;
}

export { useCities, CitiesProvider };
