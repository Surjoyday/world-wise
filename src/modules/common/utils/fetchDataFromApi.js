async function fetchDataFromApi(
  BASE_URL,
  endpoint,
  options = {},
  queryString = {}
) {
  const config = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.header || {}),
    },
  };

  const url = new URL(`${BASE_URL}`);

  if (endpoint) url.pathname += endpoint;

  if (Object.keys(queryString).length > 0) {
    url.search = new URLSearchParams(queryString);
  }

  try {
    const res = await fetch(url, config);
    if (!res.ok) throw new Error("Error loading data....");

    const data = await res.json();
    return data;
  } catch (error) {
    throw error.message;
  }
}

export { fetchDataFromApi };
