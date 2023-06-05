import React from "react";
import { Outlet } from "react-router-dom";
import {FloatPlayer} from "../components/FloatPlayer/FloatPlayer";
import { NavBar } from "../components/NavBar/NavBar";
import { SideBar } from "../components/SideBar";
import {useAppSelector} from "../hooks/use.store";

export const MainLayout: React.FC = () => {
	const { isAuth } = useAppSelector(state => state.user)

  return (
    <div className={`main-layout ${isAuth || "main-layout_not-auth"} `}>
      <NavBar />
			{ isAuth && <SideBar /> }
			<div className="main-layout__body">
				<Outlet />
				<FloatPlayer />
			</div>
    </div>
  );
};
