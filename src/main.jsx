import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import {router} from "./routes/routes";
import { LoadingProvider } from "./contexts/LoadingContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <RouterProvider router={router} />
    </LoadingProvider>
  </StrictMode>,
);
