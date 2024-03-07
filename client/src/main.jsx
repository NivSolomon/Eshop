import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { StoreProvider } from "./store.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

axios.defaults.baseURL = import.meta.env.DEV ? 'http://localhost:8080' : 'https://eshop-taupe.vercel.app/'; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* The clientId sappose to arrive from .env */}
    <PayPalScriptProvider options={{ "client-id": "AbAOHbSYQSXW9EEi882KXMHWAgUjj0-47XxezGPG8y8sH09Ih-AT6c7NPybZgdvadYJUJurko3pBJusq" }}>
      <StoreProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StoreProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
