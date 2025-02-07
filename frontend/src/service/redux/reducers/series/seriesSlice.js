import { createSlice } from "@reduxjs/toolkit";

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    series: [],
  },
  reducers: {
    setSeries: (state, action) => {
      state.series = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setSeries } = seriesSlice.actions;
export default seriesSlice.reducer;
