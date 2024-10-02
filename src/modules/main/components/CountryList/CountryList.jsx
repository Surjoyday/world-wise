import { CountryItem } from "@main/components";
import { Spinner } from "@common/components";
import { Message } from "@details/components";
import { useCities } from "@main/context/CityContext";
import styles from "./CountryList.module.css";

function CountryList() {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((ele) => ele.country).includes(city.country)) {
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    } else {
      return arr;
    }
  }, []);

  if (isLoading) return <Spinner />;

  if (!isLoading && countries.length === 0)
    return <Message message="Add our first city by clicking on the map" />;

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
