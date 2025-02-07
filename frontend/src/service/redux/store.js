import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import moviesReducer from './reducers/movies/movieSlice'

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    movies : moviesReducer
  },
});

export default store;
