import { useEffect, useState } from "react";
import st from "./TrailerModal.module.scss";
import ReactPlayer from "react-player";
import XIcon from "../../assets/icons/XIcon";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getMovieTrailer } from "../../redux/slices/trailerReducer";
import { Skeleton } from "@mui/material";

export default function TrailerModal({ open, onClose, movieId }) {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const { trailerKey, trailerName, trailerLoading } = useSelector(
    (state) => state.trailer
  );
  useEffect(() => {
    movieId && dispatch(getMovieTrailer(movieId));
    movieId && setIsPlaying(true);
  }, [movieId]);

  return (
    <div className={open ? classNames(st.root, st.root_active) : st.root}>
      <div className={st.modal}>
        <div className={st.row}>
          {trailerLoading ? (
            <Skeleton variant="text" />
          ) : (
            <h2>{trailerName}</h2>
          )}
          <button
            onClick={() => {
              onClose();
              setIsPlaying(false);
            }}
          >
            <XIcon />
          </button>
        </div>
        {trailerLoading ? (
          <Skeleton variant="rectangular" width={"100%"} height={450} />
        ) : (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            playing={isPlaying}
            controls={true}
            width="100%"
            height="450px"
          />
        )}
      </div>
    </div>
  );
}
