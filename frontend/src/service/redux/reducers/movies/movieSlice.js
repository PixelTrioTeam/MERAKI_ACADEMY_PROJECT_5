import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
  },
  reducers: {
    setMovies: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
