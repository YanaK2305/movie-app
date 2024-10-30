import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  popularMovies: [],
  loading: false,
  error: "",
  playingMovies: [],
  playingLoading: false,
  ratedMovies: [],
  ratedLoading: false,
  upcomingMovies: [],
  upcomingLoading: false,
  allMovies: [],
};

const getPopularMovies = createAsyncThunk("movies/getPopularMovies", () => {
  return axiosInstance.get("/movie/popular").then((json) => json.data);
});
const getPlayingMovies = createAsyncThunk("movies/getPlayingMovies", () => {
  return axiosInstance.get("/movie/now_playing").then((json) => json.data);
});
const getRatedMovies = createAsyncThunk("movies/getRatedMovies", () => {
  return axiosInstance.get("/movie/top_rated").then((json) => json.data);
});
const getUpcomingMovies = createAsyncThunk("movies/getUpcomingMovies", () => {
  return axiosInstance.get("/movie/upcoming").then((json) => json.data);
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopularMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPopularMovies.fulfilled, (state, action) => {
      state.error = "";
      console.log(action.payload.results.slice(0, 5));
      state.popularMovies = action.payload.results.slice(0, 5);
      state.loading = false;
    });
    builder.addCase(getPopularMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getPlayingMovies.pending, (state) => {
      state.playingLoading = true;
    });
    builder.addCase(getPlayingMovies.fulfilled, (state, action) => {
      state.error = "";
      console.log(action.payload.results.slice(0, 16));
      state.playingMovies = action.payload.results.slice(0, 16);
      state.playingLoading = false;
    });
    builder.addCase(getPlayingMovies.rejected, (state, action) => {
      state.playingLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getRatedMovies.pending, (state) => {
      state.ratedLoading = true;
    });
    builder.addCase(getRatedMovies.fulfilled, (state, action) => {
      state.error = "";
      console.log(action.payload.results.slice(0, 16));
      state.ratedMovies = action.payload.results.slice(0, 16);
      state.allMovies = action.payload.results;
      state.ratedLoading = false;
    });
    builder.addCase(getRatedMovies.rejected, (state, action) => {
      state.ratedLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUpcomingMovies.pending, (state) => {
      state.upcomingLoading = true;
    });
    builder.addCase(getUpcomingMovies.fulfilled, (state, action) => {
      state.error = "";
      console.log(action.payload.results.slice(0, 16));
      state.upcomingMovies = action.payload.results.slice(0, 16);
      state.upcomingLoading = false;
    });
    builder.addCase(getUpcomingMovies.rejected, (state, action) => {
      state.upcomingLoading = false;
      state.error = action.error.message;
    });
  },
});
export default moviesSlice.reducer;
export {
  getPopularMovies,
  getPlayingMovies,
  getRatedMovies,
  getUpcomingMovies,
};
