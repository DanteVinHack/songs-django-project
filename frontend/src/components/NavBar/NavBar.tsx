import React from "react";
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
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
      </nav>
      <Outlet />
    </>
  );
};
