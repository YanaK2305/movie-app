import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "./slices/moviesReducer";
import currentMovieReducer from "./slices/currentMovieReducer";
import trailerReducer from "./slices/trailerReducer";
import userReducer from "./slices/userReducer";
import favoriteReducer from "./slices/favoriteReducer";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    currentMovie: currentMovieReducer,
    trailer: trailerReducer,
    user: userReducer,
    favorite: favoriteReducer,
  },
});
