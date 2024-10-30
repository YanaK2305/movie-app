import st from "./MoviesSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import PlayIcon from "../../assets/icons/PlayIcon";
import LikeIcon from "../../assets/icons/LikeIcon";
import VolumeIcon from "../../assets/icons/VolumeIcon";
import { imgURL } from "../../axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavoriteMovies,
  toggleMovieFavorite,
} from "../../redux/slices/favoriteReducer";
import FavorileIcon from "../../assets/icons/FavorileIcon";

export default function MoviesSlider({ movies, openModal }) {
  const dispatch = useDispatch();
  const { accountId } = useSelector((state) => state.user);
  const { favoriteMovies } = useSelector((state) => state.favorite);
  function toggleFavorite(isFavorite, id) {
    dispatch(
      toggleMovieFavorite({
        id: accountId,
        body: {
          media_id: id,
          media_type: "movie",
          favorite: isFavorite ? false : true,
        },
      })
    ).then(() => {
      dispatch(getFavoriteMovies(accountId));
    });
  }
  return (
    <Swiper
      navigation={true}
      pagination={true}
      modules={[Navigation, Pagination]}
      className={st.root}
    >
      {movies.map((movie) => {
        const isFavorite = favoriteMovies.find(
          (favorite) => movie.id === favorite.id
        );
        return (
          <SwiperSlide key={movie.id}>
            <div className={st.slide}>
              <img src={`${imgURL}${movie.backdrop_path}`} alt="" />
              <div className={st.content}>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <div className={st.btns}>
                  <button
                    className={st.play}
                    onClick={() => openModal(movie.id)}
                  >
                    <PlayIcon />

                    <span>Play Now</span>
                  </button>
                  {/* <button className={st.btn}>
                    <PlusIcon />
                  </button> */}
                  <button
                    className={st.btn}
                    onClick={() => toggleFavorite(isFavorite, movie.id)}
                  >
                    {isFavorite ? <FavorileIcon /> : <LikeIcon />}
                  </button>
                  <button className={st.btn}>
                    <VolumeIcon />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
