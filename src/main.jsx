import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CitiesProvider } from "@main/context/CityContext";
import { AuthProvider } from "@main/context/FakeAuth";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  </StrictMode>
);
