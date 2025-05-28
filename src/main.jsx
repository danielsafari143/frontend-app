import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./routes/routes.js";
import { LoadingProvider } from "./contexts/LoadingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <RouterProvider router={routes} />
    </LoadingProvider>
  </StrictMode>,
);
