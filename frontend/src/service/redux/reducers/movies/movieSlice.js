import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
      console.log(action.payload);
    },
    setMoviesByGenreId: (state, action) => {
      state.movies = action.payload;
      console.log("Movies by Genre:", action.payload);
    },
  },
});

export const { setMovies, setMoviesByGenreId } = moviesSlice.actions;
export default moviesSlice.reducer;
