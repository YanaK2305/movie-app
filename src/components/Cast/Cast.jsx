import st from "./Cast.module.scss";
import prev from "../../assets/prev.svg";
import next from "../../assets/next.svg";

import { SwiperSlide, Swiper } from "swiper/react";
import { Skeleton } from "@mui/material";
import { useRef, useState } from "react";
import { imgURL } from "../../axiosinstance";

function Cast({ casts = [], loading }) {
  const swiperRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const sceletons = [...new Array(4)].map((_, i) => (
    <Skeleton variant="rectangular" key={i} width={"100%"} height={504} />
  ));
  const maxPage = Math.ceil(casts.length / 8);
  return (
    <div className={st.root}>
      <div className={st.top}>
        <h2>Cast</h2>
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

          <button
            onClick={() => {
              setActiveIndex((prev) => prev + 1);
              swiperRef.current.slideNext();
            }}
            disabled={activeIndex === maxPage}
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
          spaceBetween={20}
          slidesPerView={8}
          slidesPerGroup={8}
        >
          {loading
            ? sceletons
            : casts.map((item) => (
                <SwiperSlide key={item.id}>
                  <img
                    className={st.swiperImg}
                    src={`${imgURL}${item?.profile_path}`}
                    alt=""
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Cast;
