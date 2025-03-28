'use client';

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from "motion/react"

import Filters from '../components/Filters';
import CardProduct from '../components/CardProduct';

import { getAllProducts } from '@/store/actions/products.action';
import { RootState } from '@/store/createStore';
import { Product } from '@/types/Product';

import './page.scss';
import ModalProduct from '@/components/ModalProduct';

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

    const [modal, setModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleCardClick = (p: Product) => {
      setSelectedProduct(p);
      setModal(true);
    };

    return (
      <div className="containerHome">
        <div className="filters">
          <Filters />
        </div>
        <div className="cardProduct">
          {product.map((p) => (
            <CardProduct
              key={p._id}  // Make sure _id is unique
              product={p}  // передаем объект продукта
              onClick={() => handleCardClick(p)}
            />
          ))}
        </div>
        <AnimatePresence>
        {modal && selectedProduct && (
          <motion.div 
            initial={{
              y: 100,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            exit={{ 
              opacity: 0,
              y: 100
            }}

            className="modalProduct">
            <ModalProduct
              product={selectedProduct}
              onClose={() => setModal(false)}
            />
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    );
  }
);