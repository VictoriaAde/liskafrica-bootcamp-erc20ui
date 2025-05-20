import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"

import "./index.css";
import { routes } from "./routes";
import Web3Provider from "./components/providers/web3.provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <Analytics />
      <RouterProvider router={routes} />
    </Web3Provider>
  </StrictMode>
);
