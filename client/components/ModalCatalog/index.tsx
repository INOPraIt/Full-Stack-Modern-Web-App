"use-client";

import "./style.scss";

import Image from "next/image";
import React from "react";
import clothes from "@/public/icons/clothes.png";
import house from "@/public/icons/house.png";
import bear from "@/public/icons/bear.png";
import beauty from "@/public/icons/beauty.png";
import electronics from '@/public/icons/electronics.png';
import mixer from '@/public/icons/mixer.png';
import flower from '@/public/icons/flower.png';
import flowerTwo from '@/public/icons/flowerTwo.png';
import eat from '@/public/icons/eat.png';
import drill from '@/public/icons/drill.png';
import furniture from '@/public/icons/furniture.png'

export default () => {
  const categories = [
    { id: 1, named: "Одежда и обувь", icon: clothes },
    { id: 2, named: "Дом", icon: house },
    { id: 3, named: "Детские товары", icon: bear },
    { id: 4, named: "Красота", icon: beauty },
    { id: 5, named: "Электроника", icon: electronics },
    { id: 6, named: "Бытовая техника", icon: mixer },
    { id: 7, named: "Цветы", icon: flower },
    { id: 8, named: "Дача и сад", icon: flowerTwo },
    { id: 9, named: "Продукты питания", icon: eat },
    { id: 10, named: "Строительство и ремонт", icon: drill },
    { id: 11, named: "Мебель", icon: furniture },
  ];

  return (
    <div className="containerModalCatalog">
      <div className="categories">
        {categories.map((e, k) => (
          <div className="category" key={e.id}>
            <Image src={e.icon} alt="Clothes" className="iconCategory" />
            <p className="textNamedCategory">{e.named}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
