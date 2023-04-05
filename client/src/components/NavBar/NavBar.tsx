import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/use.store";
import { BiDoorOpen, GoPerson, RxShadowOuter } from "react-icons/all";
import { Button } from "../UI/Button";
import style from "./NavBar.module.css";

export const NavBar: React.FC = () => {
  const { isAuth, email, display_name, avatar } = useAppSelector((state) => state.user);

  return (
    <>
      <nav className={style.nav}>
        <li className={style.nav__item}>
          <Link to="/" className={style.nav__link}>
            <RxShadowOuter style={{ fontSize: "40px" }} />
          </Link>
        </li>
        <div className={style.nav__auth}>
          {!isAuth ? (
            <>
              <li className={style.nav__item}>
                <Link to="/auth/register/" className={style.nav__link}>
                  <Button type="button">
                    <GoPerson className="icon" />
                  </Button>
                </Link>
              </li>
              <li className={style.nav__item}>
                <Link to="/auth/login/" className={style.nav__link}>
                  <Button type="button">
                    <BiDoorOpen className="icon" />
                  </Button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={style.nav__item}>
                <Link to="/playlist/" className={style.nav__link}>
                  Плэйлисты
                </Link>
              </li>
              <li className={style.nav__item}>
                <Link to="/me/" className={style.nav__link}>
                    {avatar ? 
                      <img
                        src={avatar}
                        width="35"
                        height="35"
                        style={{ borderRadius: "50%" }}
                        className={style["nav__profile-image"]}
                      /> :
                      (display_name || email)
                    }
                    
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
