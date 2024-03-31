import { useEffect, useReducer } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { formatDate } from "../utils/formatDateNumeric";
import { convertToEmoji } from "../utils/convertToEmoji";
import Message from "./Message";
import Spinner from "./Spinner";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

const initialState = {
  cityName: "",
  countryName: "",
  date: formatDate(new Date()),
  notes: "",
  isLoadingGeocoding: false,
  emoji: "",
  geoCodingError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "locationChanged":
      const { cityData, countryData, emojiData } = action.payload;

      return {
        ...state,
        cityName: cityData || "",
        countryName: countryData || "",
        emoji: emojiData || "",
      };

    case "dateChanged":
      return { ...state, date: action.payload };

    case "setNotes":
      return { ...state, notes: action.payload };

    case "loading":
      return {
        ...state,
        isLoadingGeocoding: action.payload,
      };
    case "setError":
      return { ...state, geoCodingError: action.payload };

    default:
      throw new Error("Unkown action");
  }
}

export default function Form() {
  const [lat, lng] = useUrlPosition();

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    cityName,
    countryName,
    date,
    notes,
    isLoadingGeocoding,
    emoji,
    geoCodingError,
  } = state;

  // Reverse geo-coding (city info from position)
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          dispatch({ type: "loading", payload: true });
          dispatch({ type: "setError", payload: "" });

          const response = await fetch(
            `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
          );

          const data = await response.json();

          // console.log(data);
          if (!data.countryCode)
            throw new Error(
              "Oops! 🌍 It seems like that location isn't recognized as a valid city. Please try clicking somewhere else."
            );

          dispatch({
            type: "locationChanged",
            payload: {
              cityData: data.city || data.locality,
              countryData: data.countryName,
              emojiData: convertToEmoji(data.countryCode),
            },
          });
        } catch (err) {
          // console.log(err.message);
          dispatch({ type: "setError", payload: err.message });
        } finally {
          dispatch({ type: "loading", payload: false });
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere in the map" />;

  if (isLoadingGeocoding) return <Spinner />;

  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          value={cityName}
          onChange={(e) =>
            dispatch({
              type: "locationChanged",
              payload: { cityData: e.target.value },
            })
          }
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName} ?</label>
        <input
          id="date"
          value={date}
          onChange={(e) =>
            dispatch({ type: "dateChanged", payload: e.target.value })
          }
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <input
          id="notes"
          value={notes}
          onChange={(e) =>
            dispatch({ type: "setNotes", payload: e.target.value })
          }
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}
