export function formatDate(dateTime) {
  // eslint-disable-next-line no-undef
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateTime));
}
