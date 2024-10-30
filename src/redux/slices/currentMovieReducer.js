import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  error: "",
  currentMovie: null,
  currentLoading: false,
  credits: null,
  reviews: [],
};

const getCurrentMovie = createAsyncThunk(
  "currentMovie/getCurrentMovie",
  (id) => {
    return axiosInstance.get(`/movie/${id}`).then((json) => json.data);
  }
);
const getCredits = createAsyncThunk("currentMovie/getCredits", (id) => {
  return axiosInstance.get(`/movie/${id}/credits`).then((json) => json.data);
});
const getReviews = createAsyncThunk("currentMovie/getReviews", (id) => {
  return axiosInstance.get(`/movie/${id}/reviews`).then((json) => json.data);
});

export const currentMovieSlice = createSlice({
  name: "currentMovie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentMovie.pending, (state) => {
      state.currentLoading = true;
    });
    builder.addCase(getCurrentMovie.fulfilled, (state, action) => {
      state.error = "";
      console.log(action.payload);
      state.currentMovie = action.payload;
      state.currentLoading = false;
    });
    builder.addCase(getCurrentMovie.rejected, (state, action) => {
      state.currentLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getCredits.fulfilled, (state, action) => {
      console.log(action.payload);
      state.credits = action.payload;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      console.log(action.payload.results);
      state.reviews = action.payload.results;
    });
  },
});
export default currentMovieSlice.reducer;
export { getCurrentMovie, getCredits, getReviews };
