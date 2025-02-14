import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "fav",
  initialState: [],
  reducers: {
    setFav: (state, action) => {
      return action.payload;
    },
    addFav: (state, action) => {
      state.push(action.payload);
    },
    removeFav: (state, action) => {
      return state.filter((fav) => fav.id !== action.payload);
    },
  },
});

export const { setFav, addFav, removeFav } = favSlice.actions;
export default favSlice.reducer;
