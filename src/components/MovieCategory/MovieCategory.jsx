import { useRef, useState } from "react";
import st from "./MovieCategory.module.scss";
import prev from "../../assets/prev.svg";
import next from "../../assets/next.svg";
import MovieCard from "../MovieCard/MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import { Skeleton } from "@mui/material";

function MovieCategory({ title, movies, loading }) {
  const swiperRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const pages = [...new Array(4)].map((_, i) => i);
  const sceletons = [...new Array(4)].map((_, i) => (
    <Skeleton variant="rectangular" key={i} width={"100%"} height={504} />
  ));

  return (
    <div className={st.root}>
      <div className={st.top}>
        <h2>{title}</h2>
        <div className={st.slider}>
          <button
            onClick={() => {
              setActiveIndex((prev) => prev - 1);
              swiperRef.current.slidePrev();
            }}
            disabled={activeIndex === 0}
          >
            <img src={prev} alt="" />
          </button>
          <div className={st.pages}>
            {pages.map((page) => (
              <div
                key={page}
                className={activeIndex === page ? st.pageActive : st.page}
              ></div>
            ))}
          </div>
          <button
            onClick={() => {
              setActiveIndex((prev) => prev + 1);
              swiperRef.current.slideNext();
            }}
            disabled={activeIndex === pages.length - 1}
          >
            <img src={next} alt="" />
          </button>
        </div>
      </div>
      <div className={st.body}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={30}
          slidesPerView={4}
          slidesPerGroup={4}
        >
          {loading
            ? sceletons
            : movies.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieCategory;
