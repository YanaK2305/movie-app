import st from "./ReviewCard.module.scss";
import StarIcon from "../../assets/icons/StarIcon";

export default function ReviewCard({ item }) {
  const rate = Math.floor(item?.author_details?.rating);

  const stars = [...new Array(5)].map((_, i) => i + 1);
  return (
    <div className={st.root}>
      <div className={st.top}>
        <div className={st.left}>
          <h2>{item?.author_details?.username}</h2>
          <h3>{item?.author_details?.name || "anonim"}</h3>
        </div>
        <div className={st.rate}>
          <div className={st.stars}>
            {stars.map((num) => (
              <StarIcon isActive={num <= rate} key={num} />
            ))}
          </div>
          <span>{item?.author_details?.raiting}</span>
        </div>
      </div>
      <p>{item?.content}</p>
    </div>
  );
}
