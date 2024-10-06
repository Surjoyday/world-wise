import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { useUrlPosition } from "@common/hooks";
import { Spinner, Button } from "@common/components";
import { Message } from "@details/components";
import {
  convertToEmoji,
  BASE_GEOCODING_URL,
  makeApiRequest,
} from "@common/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "@main/context/CityContext";

const initialState = {
  cityName: "",
  country: "",
  emoji: "",
  date: new Date(),
  notes: "",
  // "loading", "error", "ready", "active", "finished"
  status: "",
  errorMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading", errorMessage: "" };

    case "form-data/updated":
      return { ...state, ...action.payload, status: "ready" };

    case "cityName/updated":
      return { ...state, cityName: action.payload };

    case "date/updated":
      return { ...state, date: action.payload };

    case "notes/updated":
      return { ...state, notes: action.payload };

    case "rejected":
      return { ...state, status: "error", errorMessage: action.payload };
    default:
      throw new Error("Unknown action in Form Component");
  }
}
function Form() {
  const [
    { cityName, country, emoji, date, notes, status, errorMessage },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { createCity, isLoading, errorMsg } = useCities();
  const navigate = useNavigate();
  const [{ lat, lng }] = useUrlPosition(); // CUSTOM HOOK TO GET QUERY STRING DATA FROM THE URL

  // REVERSE GEO-CODING
  useEffect(
    function () {
      if (!lat && !lng) return; // This ensure that if "lat" and "lng" doesn't exits then simply return , otherwise reverse-geocoding url gets the current location "lat" and "lng"
      async function fetchCityData() {
        try {
          dispatch({ type: "loading" });
          const result = await makeApiRequest(
            BASE_GEOCODING_URL,
            "",
            {},
            { latitude: lat, longitude: lng }
          );

          if (!result.countryName)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 🤪"
            );

          dispatch({
            type: "form-data/updated",
            payload: {
              cityName: result.city || result.locality || "",
              country: result.countryName,
              emoji: convertToEmoji(result.countryCode),
            },
          });
        } catch (error) {
          console.log(error.message);
          dispatch({ type: "rejected", payload: error.message });
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCityToAdd = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      id: crypto.randomUUID(),
    };

    await createCity(newCityToAdd);
    if (!errorMsg) {
      navigate("/app/cities");
    }
  }

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (status === "loading") return <Spinner />;
  if (status === "error" || errorMsg) return <Message message={errorMessage} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "cityName/updated", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => dispatch({ type: "date/updated", payload: date })}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "notes/updated", payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
