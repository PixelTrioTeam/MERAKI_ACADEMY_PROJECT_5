import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage/HomePage";
import Main from '../layouts/Main/index'
import Navbar from "../layouts/Main/index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
   
  },
]);

export default router;
