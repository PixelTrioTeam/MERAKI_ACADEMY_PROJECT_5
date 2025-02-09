import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import moviesReducer from "./reducers/movies/movieSlice";
import seriesReducer from "./reducers/series/seriesSlice";
import genreReducer from "./reducers/genre/genreSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    movies: moviesReducer,
    series: seriesReducer,
    genre: genreReducer,
  },
});

export default store;
