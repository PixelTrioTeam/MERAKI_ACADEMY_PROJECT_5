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

    setMoviesByGenre: (state, action) => {
      const { genreId, movies } = action.payload;
      state.movies[genreId] = movies;

      console.log(movies);
      console.log(action.payload);
    },
  },
});

export const { setMovies, setMoviesByGenre } = moviesSlice.actions;
export default moviesSlice.reducer;
