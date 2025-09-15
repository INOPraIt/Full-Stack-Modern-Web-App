"use client";

import styles from "./style.module.sass";

import React from "react";

import CardProduct from "./components/CardProduct";

import type { Product } from "@/types/Product";

import { useGetProductsQuery } from "@/store/reducers/Products";

export default () => {
  const { data } = useGetProductsQuery();

  const products: Product[] = data ?? [];

  return (
    <div className={styles.homeContainer}>
      {products.map((p) => (
        <CardProduct key={p._id} product={p}/>
      ))}
    </div>
  );
};
