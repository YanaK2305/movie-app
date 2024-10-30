import { useCallback, useState } from "react";
import st from "./SearchPage.module.scss";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard/MovieCard";
import { getSearchMovies } from "../../redux/slices/userReducer";
import { debounce } from "@mui/material";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { searchMovies } = useSelector((state) => state.user);
  const [value, setValue] = useState("");
  const memoSearch = useCallback(debounce(handleSearch, 1000), []);

  function handleChange(event) {
    setValue(event.target.value);
    memoSearch(event.target.value);
  }
  function handleSearch(search) {
    dispatch(getSearchMovies(search));
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className={st.root}>
          <input
            type="text"
            placeholder="Search..."
            value={value}
            onChange={handleChange}
          />
          <div className={st.body}>
            {searchMovies.map((item) => (
              <div className={st.movie} key={item.id}>
                <MovieCard item={item} visible={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
