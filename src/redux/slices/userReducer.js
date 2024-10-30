import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { apiKey } from "../../axiosinstance";

const initialState = {
  error: "",
  userLoading: false,
  accountId: null,
  searchMovies: [],
};

const getAccountDetails = createAsyncThunk("user/getAccountDetails", (id) => {
  return axiosInstance
    .get(`/account?api_key=${apiKey}&session_id=${id}`)
    .then((json) => json.data);
});
const getSearchMovies = createAsyncThunk("user/getSearchMovies", (search) => {
  return axiosInstance
    .get(`/search/collection?query=${search}`)
    .then((json) => json.data);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccountDetails.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(getAccountDetails.fulfilled, (state, action) => {
      state.error = "";
      state.userLoading = false;
      state.accountId = action.payload.id;
    });
    builder.addCase(getAccountDetails.rejected, (state, action) => {
      state.userLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getSearchMovies.fulfilled, (state, action) => {
      state.searchMovies = action.payload.results;
    });
  },
});
export default userSlice.reducer;
export { getAccountDetails, getSearchMovies };
