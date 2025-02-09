import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Main from "../layouts/Main/index";
import MoviesPage from "../pages/Series and movies page/moviesPage";

import WelcomePage from "../pages/WelcomePage/WelcomePage";

import SeriesPage from "../pages/Series and movies page/seriesPage";
import Login from "../pages/Login/login";
import Register from "../pages/register/register";
import MovieByGenre from "../pages/MovieByGenrePage/MovieByGenre";
const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/main",
    element: <Main />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/movies",
    element: <MoviesPage />,
  },
  {
    path: "/series",
    element: <SeriesPage />,
  },
  {
    path: "/genre/:genreType/:genreId",
    element: <MovieByGenre />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
