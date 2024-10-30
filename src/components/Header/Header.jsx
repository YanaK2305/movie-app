import st from "./Header.module.scss";
import logo from "../../assets/Logo.svg";
import { Link, NavLink } from "react-router-dom";
import Search from "../Search/Search";

export default function Header() {
  return (
    <header className={st.root}>
      <div className="container">
        <div className={st.body}>
          <img src={logo} alt="" />
          <div className={st.menu}>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? st.active : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? st.active : ""
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? st.active : ""
              }
            >
              Favorite
            </NavLink>
          </div>
          <Link to={"/search"}>
            <Search />
          </Link>
        </div>
      </div>
    </header>
  );
}
