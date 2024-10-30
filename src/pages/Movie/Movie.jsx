import { useEffect, useState } from "react";
import st from "./Movie.module.scss";
import Header from "../../components/Header/Header";
import MoviesSlider from "../../components/MoviesSlider/MoviesSlider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCredits,
  getCurrentMovie,
  getReviews,
} from "../../redux/slices/currentMovieReducer";
import { Skeleton } from "@mui/material";
import Cast from "../../components/Cast/Cast";
import Reviews from "../../components/Reviews/Reviews";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import LangeIcon from "../../assets/icons/LangeIcon";
import RateIcon from "../../assets/icons/RateIcon";
import StarIcon from "../../assets/icons/StarIcon";
import { imgURL } from "../../axiosinstance";
import TrailerModal from "../../components/TrailerModal/TrailerModal";

export default function Movie() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentLoading, currentMovie, error, credits, reviews } = useSelector(
    (state) => state.currentMovie
  );
  const cast = credits?.cast;
  const director = credits?.crew.find((item) => item.job === "Director");
  const songWriter = credits?.crew.find((item) => item.job === "Songs");
  const rate = Math.round(currentMovie?.vote_average / 2);
  const stars = [...new Array(5)].map((_, i) => i + 1);
  useEffect(() => {
    dispatch(getCurrentMovie(id));
    dispatch(getCredits(id));
    dispatch(getReviews(id));
  }, []);
  const [open, setOpen] = useState(false);
  const [movieId, setMovieId] = useState(null);
  function openModal(id) {
    setOpen(true);
    setMovieId(id);
  }
  if (error && !currentLoading) {
    return (
      <div className={st.root}>
        <Header />
        <div className="container">
          <h1 className={st.notFound}>This page not found</h1>
        </div>
      </div>
    );
  }
  return (
    <div className={st.root}>
      <Header />
      <div className="container">
        {currentLoading || !currentMovie ? (
          <Skeleton variant="rectangular" width={"100%"} height={835} />
        ) : (
          <MoviesSlider movies={[currentMovie]} openModal={openModal} />
        )}
        <div className={st.body}>
          <div className={st.left}>
            <div className={st.box}>
              <h4>Description</h4>
              <p>{currentMovie?.overview}</p>
            </div>
            <Cast casts={cast} loading={currentLoading} />
            <Reviews loading={currentLoading} reviews={reviews} />
          </div>
          <div className={st.right}>
            <div className={st.box}>
              <div className={st.boxItem}>
                <div className={st.row}>
                  <CalendarIcon />
                  <h4>Released Year</h4>
                </div>
                <p>{currentMovie?.release_date.slice(0, 4)}</p>
              </div>
              <div className={st.boxItem}>
                <div className={st.row}>
                  <LangeIcon />
                  <h4>Available Languages</h4>
                </div>
                <div className={st.list}>
                  {currentMovie?.spoken_languages.map((lang, index) => (
                    <div key={index} className={st.listItem}>
                      <p>{lang.english_name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={st.boxItem}>
                <div className={st.row}>
                  <RateIcon />
                  <h4>Ratings</h4>
                </div>
                <div className={st.rate}>
                  <p>IMDb</p>
                  <div className={st.row}>
                    <div className={st.stars}>
                      {stars.map((num) => (
                        <StarIcon isActive={num <= rate} key={num} />
                      ))}
                    </div>
                    <p>{currentMovie?.vote_count}</p>
                  </div>
                </div>
              </div>
              <div className={st.boxItem}>
                <div className={st.row}>
                  <h4>Director</h4>
                </div>
                <div className={st.block}>
                  <img src={`${imgURL}${director?.profile_path}`} alt="" />
                  <div className={st.blockRight}>
                    <h3>{director?.name}</h3>
                    <p>{director?.known_for_department}</p>
                  </div>
                </div>
              </div>
              <div className={st.boxItem}>
                <div className={st.row}>
                  <h4>Music</h4>
                </div>
                <div className={st.block}>
                  {songWriter?.profile_path && (
                    <img src={`${imgURL}${songWriter?.profile_path}`} alt="" />
                  )}
                  <div className={st.blockRight}>
                    <h3>{songWriter?.name}</h3>
                    <p>{songWriter?.known_for_department}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
