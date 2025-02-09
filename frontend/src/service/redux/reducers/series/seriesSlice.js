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
    setSeriesByGenreId: (state, action) => {
      state.series = action.payload;
    },
  },
});

export const { setSeries, setSeriesByGenreId } = seriesSlice.actions;
export default seriesSlice.reducer;
