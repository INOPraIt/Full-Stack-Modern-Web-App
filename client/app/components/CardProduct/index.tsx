'use client';

import style from './style.module.sass';
import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/slice/CartSlice';
import type { AppDispatch } from '@/store';
import type { Product } from '@/types/Product';
import { toast } from 'react-toastify';

interface CardProductProps {
  product: Product;
}

export default function CardProduct({ product }: CardProductProps) {
  const dispatch = useDispatch<AppDispatch>();

  const previewImages = product.previewImages ?? [];

  const limitTextDescription = (text: string, n = 100) =>
    text.length > n ? text.slice(0, n) + '…' : text;

  const correctUrl = (link: string) => link.replace('./', '/');

  const addToCart = (p: Product) => {
    dispatch(addItem({product: p, qty: 1}))
    toast.success("Добавленно в корзину");
  }

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
        {previewImages.map((src, i) => (
          <div key={i} className={style.blockImage}>
            <Image
              className={style.previewImage}
              alt="product-image-block"
              src={`http://127.0.0.1:8080${correctUrl(src)}`}
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
        <button
          onClick={() => addToCart(product)}
          className={style.btnAddToCart}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}