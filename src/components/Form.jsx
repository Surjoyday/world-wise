import { useReducer } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const initialState = {
  cityName: "X",
  countryName: "",
  date: formatDate(new Date()),
  notes: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cityNameChanged":
      return { ...state, cityName: action.payload };
    case "dateChanged":
      return { ...state, date: action.payload };
    case "setNotes":
      return { ...state, notes: action.payload };
    default:
      throw new Error("Unkown action");
  }
}

export default function Form() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cityName, countryName, date, notes } = state;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          value={cityName}
          onChange={(e) =>
            dispatch({ type: "cityNameChanged", payload: e.target.value })
          }
        />
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
