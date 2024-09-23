import { Navigate, Route, Routes } from "react-router-dom";
import {
  AppLayout,
  HomePage,
  Login,
  PageNotFound,
  Pricing,
  Product,
} from "@pages";
import { CityList, CountryList, City } from "@main/components";
import { Form } from "@details/components";

function App() {
  // console.log(cities);

  // console.log(cities);

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />

        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          {/* "replace" replaces the current URL in the history stack with the new URL instead of adding a new entry */}
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:cityID" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
