import styles from "./CityList.module.css";

import { CityItem } from "@main/components";
import { Spinner } from "@common/components";
import { Message } from "@details/components";
import { useCities } from "@main-context/CityContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!isLoading && cities.length === 0)
    return <Message message="Add our first city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
