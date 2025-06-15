"use client";

import React, { useState } from "react";
import "./style.scss";
import StarsRating from "@/components/StarsRating";
import Image from "next/image";
import avatar from "@/public/avatar.png";
import productReview from "@/public/productReview.png";

export default () => {
  const [rating, setRating] = useState<number>(5);

  return (
    <div className="profileContainer">
      <div className="blockGeneralProfile">
        <div className="colorProfile"></div>
        <div className="infoProfile"></div>
        <div className="avatarProfile">
          <Image
            src={avatar}
            width={"200"}
            height={"200"}
            alt="Avatar"
            className="avatarProfileImage"
          />
        </div>
        <div className="namedUser">
          <p className="namedUserText">Дмитрий Рыжев</p>
        </div>
      </div>
      <div className="blockGInfoToOrder">
        <div className="blockCardProductOrder">
          <div className="reviewUser">
            <div className="avatarReviewUser">
              <Image
                src={avatar}
                width={"200"}
                height={"200"}
                alt="Avatar"
                className="avatarReviewUserqImage"
              />
            </div>
            <div className="blockRatingOrder">
              <p className="textNamedReviewUser">Дмитрий Рыжев</p>
              <StarsRating rating={rating} onRate={setRating} />
            </div>
          </div>

          <div className="blockTetxInforamationYouOrder">
            <div className="block">
              <p className="textNamedInforamationYouOrder">Достоинства:</p>
              <p className="textNamedInforamationYouOrder">Недостатки:</p>
              <p className="textNamedInforamationYouOrder">Комментарий:</p>
            </div>
            <div className="block">
              <p className="textInforamationYouOrder">
                Оригинальный iphone 15.
              </p>
              <p className="textInforamationYouOrder">Нет.</p>
              <p className="textInforamationYouOrder">
                Отличный магазин возьму у них macbook.
              </p>
            </div>
          </div>

          <div className="productReview">
            <div className="imageProductPreviewBlock">
              <Image
                src={productReview}
                width={"200"}
                height={"200"}
                alt="Avatar"
                className="imageProductReview"
              />
            </div>
            <div className="infoProductReview">
              <p className="textNamedProductReview">
                Смартфон Apple iPhone 15 128 ГБ, Dual: nano SIM + eSIM, розовый
              </p>
              <p className="textNoSale">Нет в проджаже</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
