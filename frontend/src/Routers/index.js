import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import Navbar from "../layout/main/indexMain";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <Navbar />,
      },
    ],
  },
]);

export default router;
