import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import moviesReducer from "./reducers/movies/movieSlice";
import seriesReducer from "./reducers/series/seriesSlice";
import genreReducer from "./reducers/genre/genreSlice";
import userReducer from "./reducers/users/usersSlice";
import favReducer from "./reducers/fav/favSlice";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    movies: moviesReducer,
    series: seriesReducer,
    genre: genreReducer,
    users: userReducer,
    fav: favReducer,
  },
});

export default store;
