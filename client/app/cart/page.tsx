"use client";

import style from "./style.module.sass";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotals } from "@/store/selectors/cart";
import { decrease, removeItem, setQty, clear } from "@/store/slice/CartSlice";
import Image from "next/image";
import placeholder from "@/public/images/logo.png";

export default function page() {
  const items = useSelector(selectCartItems);
  const { qty, sum } = useSelector(selectCartTotals);
  const dispatch = useDispatch();
  const fixUrl = (link: string) => link.replace("./", "/");

  return (
    <div className={style.containerCart}>
      <span className={style.titleCart}>Ваша корзина</span>
      <div className={style.productsCartContainer}>
        {items.map((product) => {
          const src = product.image
            ? `http://127.0.0.1:8080${fixUrl(product.image)}`
            : placeholder;
          return (
            <>
              <div className={style.productCart} key={product.productId}>
                <div className={style.productNamedAndImage}>
                  <div className={style.imageProductCart}>
                    <Image
                      className={style.productimageCart}
                      src={src}
                      width={100}
                      height={100}
                      alt={product.named}
                    />
                  </div>
                  <span className={style.namedProduct}>{product.named}</span>
                </div>
                <div className={style.priceAndQty}>
                  <span className={style.priceProduct}>
                    {product.price * product.qty} $
                  </span>
                  <button 
                    className={style.btnPlusProduct}
                    onClick={() => dispatch(setQty({ id: product.productId, qty: product.qty + 1 }))}>+</button>
                  <span className={style.priceProduct}>
                    {product.qty} шт
                  </span>
                  <button 
                    className={style.btnPlusProduct}
                    onClick={() => dispatch(setQty({ id: product.productId, qty: product.qty - 1 }))}>-</button>
                </div>
              </div>
              <div className={style.lineCart} />
            </>
          );
        })}
      </div>
    </div>
  );
}
