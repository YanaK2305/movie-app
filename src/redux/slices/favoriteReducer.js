import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance";

const initialState = {
  error: "",
  favoriteLoading: false,
  favoriteMovies: [],
};

const getFavoriteMovies = createAsyncThunk(
  "trailer/getFavoriteMovies",
  (id) => {
    return axiosInstance
      .get(`/account/${id}/favorite/movies`)
      .then((json) => json.data);
  }
);
const toggleMovieFavorite = createAsyncThunk(
  "trailer/toggleMovieFavorite",
  ({ id, body }) => {
    return axiosInstance
      .post(`/account/${id}/favorite`, body)
      .then((json) => json.data);
  }
);

export const trailerSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteMovies.pending, (state) => {
      state.favoriteLoading = true;
    });
    builder.addCase(getFavoriteMovies.fulfilled, (state, action) => {
      state.error = "";
      state.favoriteLoading = false;
      state.favoriteMovies = action.payload.results;
    });
    builder.addCase(getFavoriteMovies.rejected, (state, action) => {
      state.favoriteLoading = false;
      state.error = action.error.message;
    });
  },
});
export default trailerSlice.reducer;
export { getFavoriteMovies, toggleMovieFavorite };
