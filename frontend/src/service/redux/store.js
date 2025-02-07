import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import moviesReducer from "../redux/reducers/movies/movieSlice";
import seriesReducer from "./reducers/series/seriesSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    movies: moviesReducer,
    series: seriesReducer,
  },
});

export default store;
