"use-client";

import style from "./style.module.sass";

import React from "react";
import Image from "next/image";

import type { Product } from "@/types/Product";

interface CardProductProps {
  product: Product;
}

export default ({ product }: CardProductProps) => {
  const priviewImages = product.previewImages ?? [];

  const limitTextDescription = (text: string) => {
    if (text.length > 10) {
      return text.substring(0, 10);
    }
  };

  const correctUrl = (link: string) => {
    return link.replace("./", "/");
  };

  return (
    <div className={style.productContainer}>
      <div className={style.generalImageProduct}>
        <Image
          className={style.image}
          alt="product-image"
          src={`http://127.0.0.1:8080${correctUrl(product.image)}`}
          width={700}
          height={700}
        />
      </div>
      <div className={style.imagesProduct}>
        {priviewImages.map((previewImage, index) => (
          <div 
            key={index}
            className={style.blockImage}>
            <Image
              className={style.previewImage}
              alt="product-image-block"
              src={`http://127.0.0.1:8080${correctUrl(previewImage)}`}
              width={50}
              height={50}
            />
          </div>
        ))}
      </div>
      <div className={style.descriptionProduct}>
        <span className={style.titleProduct}>{product.named}</span>
        <span className={style.subtitleProduct}>
          {limitTextDescription(product.description)}
        </span>
      </div>
      <div className={style.buttonAddCart}>
        <button className={style.btnAddToCart}>В корзину</button>
      </div>
    </div>
  );
};
