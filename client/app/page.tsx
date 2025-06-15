"use client";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { motion, AnimatePresence } from "motion/react";

import CardProduct from "@/components/CardProduct";
import ModalPortal from "@/components/ModalPortal";

import { getAllProducts } from "@/store/actions/products.action";
import { RootState } from "@/store/createStore";
import { Product } from "@/types/Product";

import "./page.scss";
import ModalProduct from "@/components/ModalProduct";

type Props = {
  product: Product[];
  getAllProducts: () => void;
};

export default connect(
  (state: RootState) => ({
    product: state.products.state,
  }),
  {
    getAllProducts,
  }
)(({ product, getAllProducts }: Props) => {
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  const handleCardClick = (p: Product) => {
    setSelectedProduct(p);
    setModal(true);
  };

  return (
    <div className="containerHome">
      <div className="containerHomeGeneral">
        <div className="cardProduct">
          {product.map((p) => (
            <CardProduct
              key={p._id}
              product={p}
              onClick={() => handleCardClick(p)}
            />
          ))}
        </div>
        <AnimatePresence>
          {modal && selectedProduct && (
            <ModalPortal>
              <motion.div
                initial={{
                  y: 100,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 100,
                }}
              >
                <ModalProduct
                  product={selectedProduct}
                  onClose={() => setModal(false)}
                />
              </motion.div>
            </ModalPortal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
