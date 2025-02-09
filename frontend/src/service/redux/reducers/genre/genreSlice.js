import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: { genre: [] },
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload;
      console.log("genre state ", action.payload);
    },
  },
});

export const { setGenre } = genreSlice.actions;
export default genreSlice.reducer;
