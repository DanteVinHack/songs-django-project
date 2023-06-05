import React from "react";
import {Link} from "react-router-dom";
import style from "./SideBar.module.css";

export const SideBar: React.FC = () => {
	const sidebarLinks = [
		{ link: '', text: 'Главная'},
		{ link: 'favorite', text: 'Любимые трэки' },
		{ link: 'add-track', text: 'Добавить трэк' },
		{ link: 'me', text: 'Настройки' }
	]

  return (
    <nav className={style.sidebar}>
      <h1>Sidebar</h1>
				<ul className={style.sidebar__list}>
					{sidebarLinks.map((sidebarLink, index) => (
						<li key={index} className={style.sidebar__item}>
							<Link className={style.sidebar__link} to={sidebarLink.link}>{sidebarLink.text}</Link>
						</li>
					))}
				</ul>
    </nav>
  );
};
