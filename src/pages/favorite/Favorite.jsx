import { useEffect } from "react";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../redux/slices/favoriteReducer";
import MovieCard from "../../components/MovieCard/MovieCard";
import st from "./Favorite.module.scss";

export default function Favorite() {
  const dispatch = useDispatch();
  const { accountId } = useSelector((state) => state.user);
  const { favoriteMovies } = useSelector((state) => state.favorite);
  useEffect(() => {
    accountId && dispatch(getFavoriteMovies(accountId));
  }, [accountId]);
  return (
    <div>
      <Header />
      <div className="container">
        <div className={st.root}>
          {favoriteMovies.map((item) => (
            <div className={st.movie} key={item.id}>
              <MovieCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
