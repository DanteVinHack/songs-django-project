import React from "react";
import style from "./NavBar.module.css";
import { Link, Outlet } from "react-router-dom";

export const NavBar: React.FC = () => {
  // <li>
  //   <Link to="/music">Music</Link>
  // </li>
  // <li>
  //   <Link to="/register">Register</Link>
  // </li>
  return (
    <>
      <nav className={style.nav}>
        <li className={style.nav__item}>
          <Link to="/" className={style.nav__link}>
            Home
          </Link>
        </li>
      </nav>
      <Outlet />
    </>
  );
};
