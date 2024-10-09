import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { CityList, CountryList, City } from "@main/components";
import { Form } from "@details/components";
import { SpinnerFullPage } from "@common/components";

const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const Pricing = lazy(() => import("@pages/Pricing/Pricing"));
const Product = lazy(() => import("@pages/Product/Product"));
const PageNotFound = lazy(() => import("@pages/PageNotFound/PageNotFound"));
const AppLayout = lazy(() => import("@pages/AppLayout/AppLayout"));
const Login = lazy(() => import("@pages/Login/Login"));
const ProtectedRoute = lazy(() =>
  import("@pages/ProtectedRoute/ProtectedRoute")
);

function App() {
  // console.log(cities);

  return (
    <>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />

          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="cities" />} />
            {/* "replace" replaces the current URL in the history stack with the new URL instead of adding a new entry */}
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:cityID" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
