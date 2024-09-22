import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function handleNavigate() {
    navigate("form");
  }

  return (
    <div className={styles.mapContainer} onClick={handleNavigate}>
      <h1>{lat}</h1>
      <h1>{lng}</h1>
    </div>
  );
}

export default Map;
