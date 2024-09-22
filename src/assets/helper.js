// export const BASE_URL = "http://localhost:8001";
export const BASE_URL =
  "https://my-json-server.typicode.com/Surjoyday/world-wise";

export function formatDate(dateTime) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateTime));
}
