import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CitiesProvider } from "@maincontext/CityContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CitiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CitiesProvider>
  </StrictMode>
);
