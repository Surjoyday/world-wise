import { useEffect, useMemo, useRef, useState } from "react";

function useFetch(URL, endpoint, onSetData, options = {}) {
  // Configuring the option object passed as the 2nd argument to the fetch method based on the arguments passed when calling this hook, also memoizing the config object to prevent infinte loop
  const config = useMemo(() => {
    const memoizedConfig = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    };

    if (options.body) {
      memoizedConfig.body = JSON.stringify(options.body);
    }

    return memoizedConfig;
  }, [options.body, options.headers, options.method]);

  // Adding the body property to the config object if it exits

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(
    function () {
      async function getCityData() {
        try {
          setIsLoading(true);
          const res = await fetch(`${URL}/${endpoint}`, config);
          if (!res.ok) throw new Error("HTTP REQUEST ERROR");
          const data = await res.json();
          setData(data);
          onSetData?.(data);
        } catch (error) {
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      // using timer to make it behave like a actual server; server delays
      timerRef.current = setTimeout(getCityData, 0);

      return () => clearTimeout(timerRef.current);
    },
    [URL, config, endpoint, onSetData]
  );

  return [data, isLoading];
}

export { useFetch };
