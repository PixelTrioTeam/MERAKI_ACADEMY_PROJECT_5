import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Main from "../layouts/Main/index"; 
import MoviesPage from "../pages/Series and movies page/moviesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/movies",  
    element: <MoviesPage />,
  },
]);

export default router;
