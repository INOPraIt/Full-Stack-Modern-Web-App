'use client';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Filters from '../components/Filters';
import CardProduct from '../components/CardProduct';

import { getAllProducts } from '@/store/actions/products.action';
import { RootState } from '@/store/createStore';
import { Product } from '@/types/Product';

import './page.scss';

type Props = {
  product: Product[];
  getAllProducts: () => void;
};

export default connect(
  (state: RootState) => ({
    product: state.products.state, // <-- путь к твоим данным
  }),
  {
    getAllProducts,
  }
)(
  ({ product, getAllProducts }: Props) => {
    useEffect(() => {
      getAllProducts();
    }, [getAllProducts]);

    return (
      <div className="containerHome">
        <div className="filters">
          <Filters />
        </div>
        <div className="cardProduct">
          {product.map((p) => (
            <CardProduct key={p._id} {...p} />
          ))}
        </div>
      </div>
    );
  }
);