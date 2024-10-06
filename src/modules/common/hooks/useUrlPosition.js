import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = {};

  // The "forEach" method here is the one provided by URLSearchParams, which iterates over the key-value pairs in the URLSearchParams object.

  // for (const [val, key] of searchParams) {
  //   console.log(val);
  // }

  searchParams.forEach((value, key, obj) => {
    queryParams[key] = value;
    // console.dir(obj);
  });

  return [queryParams, setSearchParams];
}

export default useUrlPosition;
