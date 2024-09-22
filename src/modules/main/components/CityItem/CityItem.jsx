import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

import { formatDate } from "@assets/helper";

function CityItem({ city }) {
  const {
    cityName,
    date,
    emoji,
    id,
    position: { lat, lng },
  } = city;

  return (
    <li>
      <Link to={`${id}?lat=${lat}&lng=${lng}`} className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
