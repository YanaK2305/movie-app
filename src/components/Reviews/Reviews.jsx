import st from "./Reviews.module.scss";
import prev from "../../assets/prev.svg";
import next from "../../assets/next.svg";
import { SwiperSlide, Swiper } from "swiper/react";
import { Skeleton } from "@mui/material";
import { useRef, useState } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";

function Reviews({ reviews = [], loading }) {
  const swiperRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const maxPage = Math.ceil(reviews.length / 2);
  const pages = [...new Array(maxPage)].map((_, i) => i);
  const sceletons = [...new Array(2)].map((_, i) => (
    <Skeleton variant="rectangular" key={i} width={"100%"} height={504} />
  ));

  return (
    <div className={st.root}>
      <div className={st.top}>
        <h2>Reviews</h2>
      </div>
      <div className={st.body}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={20}
          slidesPerView={2}
          slidesPerGroup={2}
        >
          {loading
            ? sceletons
            : reviews.map((item) => (
                <SwiperSlide key={item.id}>
                  <ReviewCard item={item} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
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
  );
}

export default Reviews;
