import { Spinner, Button } from "@common/components";

import styles from "./City.module.css";

import { formatDate } from "@common/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../../context/CityContext";
import { useEffect } from "react";

function City() {
  const navigate = useNavigate();
  const { currentCity, fetchCityDetails, isLoading } = useCities();

  const { cityID } = useParams();

  useEffect(
    function () {
      fetchCityDetails(cityID);
    },
    [cityID, fetchCityDetails]
  );

  const { cityName, date, emoji, notes } = currentCity;

  function handleNavigate() {
    navigate(-1);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>{cityName}</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button onClick={handleNavigate} type="back">
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
