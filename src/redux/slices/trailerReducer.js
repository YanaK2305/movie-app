import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  error: "",
  trailerKey: "",
  trailerLoading: false,
  trailerName: "",
};

const getMovieTrailer = createAsyncThunk("trailer/getMovieTrailer", (id) => {
  return axiosInstance.get(`/movie/${id}/videos`).then((json) => json.data);
});

export const trailerSlice = createSlice({
  name: "trailer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieTrailer.pending, (state) => {
      state.trailerLoading = true;
    });
    builder.addCase(getMovieTrailer.fulfilled, (state, action) => {
      state.error = "";
      console.log(
        action.payload.results.filter((item) => item.type === "Teaser")[0]
      );
      const teaser = action.payload.results.filter(
        (item) => item.type === "Teaser"
      )[0];
      state.trailerKey = teaser.key;
      state.trailerName = teaser.name;
      state.trailerLoading = false;
    });
    builder.addCase(getMovieTrailer.rejected, (state, action) => {
      state.trailerLoading = false;
      state.error = action.error.message;
    });
  },
});
export default trailerSlice.reducer;
export { getMovieTrailer };
