"use-client";

import style from "./style.module.sass";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "../../../public/images/logo.png";

export default () => {
  return (
    <div className={style.navbarContainer}>
      <div className={style.navbarLinks}>
        <Image
          width={50}
          height={50}
          alt="logo"
          src={logo}
          className={style.logo}
        />
        <div className={style.links}>
          <Link className={style.link} href={"/market"}>
            Магазин
          </Link>
          <Link className={style.link} href={"/profile"}>
            Профиль
          </Link>
          <Link className={style.link} href={"/trade"}>
            Обмены
          </Link>
          <Link className={style.link} href={"/search"}>
            Поиск
          </Link>
        </div>
        <div className={style.buttons}>
          <button className={style.buttonLogin}>
            <Link href={"/register"}>Авторизация</Link>
          </button>
        </div>
      </div>
      <div className={style.navbarLine} />
    </div>
  );
};
