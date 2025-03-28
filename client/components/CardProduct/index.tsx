'use client';

import React from 'react';
import './style.scss';
import Image from 'next/image';
import { Product } from '@/types/Product';

type CardProductProps = {
  product: Product;
  onClick: () => void;
};

export default function CardProduct({ onClick, product }: CardProductProps) {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const imagePath = product.image;
  const fullImageUrl = `${apiUrl}${imagePath.replace(/^\./, '')}`;

  return (
    <div onClick={onClick} className='cardProductContainer'>
      <div className='imageBlockProductCard'>
        <Image
          src={fullImageUrl}
          width={900}
          height={500}
          className='image'
          alt={product.named}
        />
      </div>
      <div className='infoBlock'>
        <div className='status'>
          <p className='textStatus'>
            {product.status ? 'В наличии' : 'Нет в наличии'}
          </p>
        </div>
        <div className='named'>
          <p className='textNamed'>{product.named}</p>
        </div>
        <hr className='lineCard' />
        <div className='infoAboutProduct'>
          <div className='blockInfoAboutProduct'>
            <p className='headerInfoAboutProduct'>Цена</p>
            <p className='valueInfoAboutProduct'>${product.price}</p>
          </div>
          <div className='blockInfoAboutProduct'>
            <p className='headerInfoAboutProduct'>Отзывы</p>
            <p className='valueInfoAboutProduct'>{product.sale}</p>
          </div>
          <div className='blockInfoAboutProduct'>
            <p className='headerInfoAboutProduct'>Прибыль</p>
            <p className='valueInfoAboutProduct'>${product.profit}</p>
          </div>
        </div>
      </div>
    </div>
  );
}