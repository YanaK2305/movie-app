import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MoviesSlider from "../../components/MoviesSlider/MoviesSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlayingMovies,
  getPopularMovies,
  getRatedMovies,
  getUpcomingMovies,
} from "../../redux/slices/moviesReducer";
import { Skeleton } from "@mui/material";
import st from "./Home.module.scss";
import MovieCategory from "../../components/MovieCategory/MovieCategory";
import TrailerModal from "../../components/TrailerModal/TrailerModal";

export default function Home() {
  const dispatch = useDispatch();
  const {
    popularMovies,
    loading,
    error,
    playingMovies,
    ratedMovies,
    upcomingMovies,
    playingLoading,
    ratedLoading,
    upcomingLoading,
  } = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getPlayingMovies());
    dispatch(getRatedMovies());
    dispatch(getUpcomingMovies());
  }, []);
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState(null);
  function openModal(id) {
    setOpen(true);
    setMovieId(id);
  }
  if (error) {
    return (
      <div className="container">
        <h1>Enable VPN to view this page</h1>
      </div>
    );
  }
  return (
    <div className={st.root}>
      <Header />
      <div className="container">
        {loading ? (
          <Skeleton variant="rectangular" width={"100%"} height={835} />
        ) : (
          <MoviesSlider movies={popularMovies} openModal={openModal} />
        )}
        <div className={st.categories}>
          <MovieCategory
            title={"Now Playing"}
            movies={playingMovies}
            loading={playingLoading}
          />
          <MovieCategory
            title={"Top Rated"}
            movies={ratedMovies}
            loading={ratedLoading}
          />
          <MovieCategory
            title={"Upcoming"}
            movies={upcomingMovies}
            loading={upcomingLoading}
          />
        </div>
      </div>
      <TrailerModal
        open={open}
        onClose={() => setOpen(false)}
        movieId={movieId}
      />
    </div>
  );
}
