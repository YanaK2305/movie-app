import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ShowsPage from "./pages/showsPage/ShowsPage";
import Favorite from "./pages/favorite/Favorite";
import Movie from "./pages/Movie/Movie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAccountDetails } from "./redux/slices/userReducer";
import SearchPage from "./pages/searchPage/SearchPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccountDetails("d6ee2936d8b5628ccab99ad927dee94222a18999"));
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<ShowsPage />} />
      <Route path="/favorites" element={<Favorite />} />
      <Route path="/movies/:id" element={<Movie />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
