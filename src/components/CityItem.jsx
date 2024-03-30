import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../contexts/CitiesContext";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

export default function CityItem({ city }) {
  const { currentCity } = useCitiesContext();

  const { cityName, emoji, date, id, position } = city;

  const isActive = city.id === currentCity.id;

  // console.log(position);

  // console.log(`${cityName} --> ${id}`);

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          isActive ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.cityName}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.btnDelete}>&times;</button>
      </Link>
    </li>
  );
}
