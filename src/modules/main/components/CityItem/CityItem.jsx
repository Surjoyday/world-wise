import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { formatDate } from "@common/utils";
import { useCities } from "@main/context/CityContext";

function CityItem({ city }) {
  const {
    cityName,
    date,
    emoji,
    id,
    position: { lat, lng },
  } = city;

  const { currentCity, deleteCity } = useCities();

  const isClicked = id === currentCity.id;

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} ${
          isClicked ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
