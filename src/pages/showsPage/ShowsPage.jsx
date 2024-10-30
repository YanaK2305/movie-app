import { useEffect } from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getRatedMovies } from "../../redux/slices/moviesReducer";
import st from "./ShowsPage.module.scss";
import MovieCard from "../../components/MovieCard/MovieCard";

export default function ShowsPage() {
  const dispatch = useDispatch();
  const { allMovies } = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(getRatedMovies());
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <div className={st.root}>
          {allMovies.map((item) => (
            <div className={st.movie} key={item.id}>
              <MovieCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
