import st from "./MovieCard.module.scss";
import StarIcon from "../../assets/icons/StarIcon";
import { imgURL } from "../../axiosinstance";
import { Link } from "react-router-dom";

export default function MovieCard({ item, visible = true }) {
  const rate = Math.round(item.vote_average / 2);
  const stars = [...new Array(5)].map((_, i) => i + 1);
  return (
    <div className={st.root}>
      <Link to={`/movies/${item.id}`}>
        <img src={`${imgURL}${item.poster_path}`} alt="" />
      </Link>
      {visible && (
        <div className={st.body}>
          <div className={st.time}>
            <span>{item.release_date}</span>
          </div>

          <div className={st.rate}>
            <div className={st.stars}>
              {stars.map((num) => (
                <StarIcon isActive={num <= rate} key={num} />
              ))}
            </div>
            <span>{item.vote_count}</span>
          </div>
        </div>
      )}
    </div>
  );
}
