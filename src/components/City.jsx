import { useParams } from "react-router-dom";

import styles from "./City.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function City() {
  const { id } = useParams();
  return <h1>City ---- {id}</h1>;
}
