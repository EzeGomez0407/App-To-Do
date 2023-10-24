"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FcTodoList } from "react-icons/fc";
import { handleScrollforStyleNavBar } from "../controllers/stylesChanges";
import style from "./styles/NavBarComponent.module.css";

export default function NavBar() {
  const { data: userSession } = useSession();
  const [showSlideMenu, setShowSlideMenu] = useState(false);
  const [displayWidth, setDisplayWidth] = useState(null);
  const showOrHideSlideMenuOnClick = () => {
    !showSlideMenu ? setShowSlideMenu(true) : setShowSlideMenu(false);
  };

  useEffect(() => {
    const navBar = document.getElementById("navBar");
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      handleScrollforStyleNavBar(navBar, scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      setDisplayWidth(window.innerWidth);
    }
  }, []);

  return (
    <nav className={style.containNav} id="navBar">
      {userSession?.user && displayWidth < 900 ? (
        <button
          className={style.buttonMenu}
          onClick={showOrHideSlideMenuOnClick}
        >
          <CiMenuKebab className={style.iconMenu} />
        </button>
      ) : (
        userSession?.user && (
          <button className={style.btnLogout} onClick={() => signOut()}>
            Cerrar Sesion
          </button>
        )
      )}
      {showSlideMenu && (
        <div id="slide-options" className={style.containSlideOptions}>
          <button className={style.btnSlideOptions} onClick={() => signOut()}>
            Cerrar Sesion
          </button>
        </div>
      )}
      <span className={style.simbolToDo}>
        <FcTodoList className={style.iconTodo} />
        ToDo
      </span>
      {userSession?.user && (
        <span className={style.containUserNameAndImage}>
          {userSession?.user.name}
          <img
            className={style.userImage}
            src={
              userSession?.user.image ||
              "https://www.pngkit.com/png/full/281-2812821_user-account-management-logo-user-icon-png.png"
            }
          />
        </span>
      )}
    </nav>
  );
}
