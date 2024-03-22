import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNoFount from "./pages/PageNotFound";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import CityList from "./components/CityList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNoFount />} />
      </Routes>
    </BrowserRouter>
  );
}
