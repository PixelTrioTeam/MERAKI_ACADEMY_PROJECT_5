import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "likes",
  initialState: [],
  reducers: {
    setLikes: (state, action) => {
      return action.payload;
    },
    addLike: (state, action) => {
      state.push(action.payload);
    },
    removeLike: (state, action) => {
      return state.filter(
        (like) =>
          like.id !== action.payload.id || like.type !== action.payload.type
      );
    },
  },
});

export const { setLikes, addLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
