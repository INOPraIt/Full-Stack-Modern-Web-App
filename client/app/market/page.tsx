'use client';

import styles from './style.module.sass';
import React from 'react';
import CardProduct from '../components/CardProduct';
import { useGetProductsQuery } from '@/store/reducers/Products';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/types/Product';

export default () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  // если у тебя пагинация — подставь page/limit
  const { data, isLoading, isError } = useGetProductsQuery({ q, page: 1, limit: 24 });

  const products: Product[] = data?.items ?? []; // <- ВАЖНО: .items

  if (isLoading) return <div className={styles.homeContainer}>Загрузка…</div>;
  if (isError)   return <div className={styles.homeContainer}>Ошибка загрузки</div>;

  return (
    <div className={styles.homeContainer}>
      {products.map((p) => (
        <CardProduct key={p._id} product={p} />
      ))}
    </div>
  );
}