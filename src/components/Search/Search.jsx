import st from "./Search.module.scss";
import search from "../../assets/Icon.svg";

export default function Search() {
  return (
    <div className={st.root}>
      <img src={search} alt="" />
    </div>
  );
}
