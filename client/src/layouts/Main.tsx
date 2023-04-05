import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { SideBar } from "../components/SideBar";

export const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <NavBar />
      <SideBar />
      <Outlet />
    </div>
  );
};
