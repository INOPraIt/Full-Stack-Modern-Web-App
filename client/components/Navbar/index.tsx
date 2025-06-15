"use-client";

import React from "react";
import "./style.scss";
import Link from "next/link";
import Image from "next/image";
import order from "@/public/icons/box.png";
import cart from "@/public/icons/cart.png";
import love from "@/public/icons/love.png";
import avatar from "@/public/avatar.png";
import ModalCatalog from "../ModalCatalog";

export default () => {
  const [catalogOpen, setCatalogOpen] = React.useState(false);

  return (
    <div className="containerNavbar">
      <div className="stringsNav">
        <div className="stringNavOne">
          <Link href={"/"} className="logoText">
            Маркет
          </Link>
          <button
            onClick={() => setCatalogOpen(prev => !prev)}
            className="btnCatalog">
              Каталог
          </button>
          <div className="searchStringNav">
            <input className="search" placeholder="Найти товары" />
            <button className="searchProfuctBtn">Найти</button>
          </div>
          <div className="linksHelper">
            <div className="orders">
              <Link href={"/orders"} className="text">
                <Image
                  src={order}
                  alt={"Order"}
                  width={"40"}
                  height={"40"}
                  className="imageOrder"
                />
                <p>Заказы</p>
              </Link>
            </div>
            <div className="orders">
              <Link href={"/like"} className="text">
                <Image
                  src={love}
                  alt={"Order"}
                  width={"40"}
                  height={"40"}
                  className="imageOrder"
                />
                <p>Избранное</p>
              </Link>
            </div>
            <div className="orders">
              <Link href={"/cart"} className="text">
                <Image
                  src={cart}
                  alt={"Order"}
                  width={"40"}
                  height={"40"}
                  className="imageOrder"
                />
                <p>Корзина</p>
              </Link>
            </div>
          </div>
          <Link href={"/profile"} className="avatarProfileNav">
            <Image src={avatar} alt={"Avatar"} className="avatarNav" />
          </Link>
        </div>
        <div className="stringTwo">
          <Link href={'/likecatigory'} className="linkCategory">
            Любимая категория
          </Link>
          <Link href={'/likecatigory'} className="linkCategory">
            Из-за рубежа
          </Link>
          <Link href={'/likecatigory'} className="linkCategory">
            Одежда
          </Link>
          <Link href={'/likecatigory'} className="linkCategory">
            Дом
          </Link>
          <Link href={'/likecatigory'} className="linkCategory">
            Ремонт
          </Link>
          <Link href={'/likecatigory'} className="linkCategory">
            Детям
          </Link>
          <Link href={'/likecatigory'} className="linkCategory">
            Красота
          </Link>
          <Link href={'/likecatigory'} className="linkCategory">
            Электроника
          </Link>
        </div>
      </div>
      {catalogOpen && 
        <div className="modalCatalog">
          <div className="modalCatalogContent">
            <div className="modalCatalogContentTrue">
              <ModalCatalog />
            </div>
          </div>
        </div>
      }
    </div>
  );
};
