import { useEffect, useRef, useState } from "react";

function useFetch(URL, endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(
    function () {
      async function getCityData() {
        try {
          setIsLoading(true);
          const res = await fetch(`${URL}/${endpoint}`);
          if (!res.ok) throw new Error("HTTP REQUEST ERROR");
          const data = await res.json();
          setData(data);
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      // using timer to make it behave like a actual server; server delays
      timerRef.current = setTimeout(getCityData, 500);

      return () => clearTimeout(timerRef.current);
    },
    [URL, endpoint]
  );

  return [data, isLoading];
}

export { useFetch };
