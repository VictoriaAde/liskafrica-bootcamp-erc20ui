import { createBrowserRouter } from "react-router-dom";
import { layouts } from "./layouts";
import { pages } from "./pages";

export const routes = createBrowserRouter([
  {
    element: layouts.appLayout,
    children: [
      {
        path: "/",
        element: pages.rootPage,
      },
    ],
  },
]);
