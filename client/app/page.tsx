"use client";

import { redirect } from "next/navigation";
import styles from "./style.module.sass";

import React from "react";

export default () => {
  return (
    <div className={styles.homeContainer}>
      <span className={styles.titleWelcome}>Добро пожаловать в мой проект</span>
      <div className={styles.blockWelcome}>
        <span className={styles.subtitle}>интернет магазин</span>
        <span className={styles.subtitleTwo}>Kinetic</span>
      </div>
      <span className={styles.subtitleWelcome}>
        Мой тестовый FullStack проект на NextJS и FastifyJS
      </span>
      <button 
        onClick={() => redirect('/market')}
        className={styles.button}>Перейти</button>
      <div className={styles.cardsWelcome}>
        <div className={styles.cardStyle}>
          <span className={styles.textCardStyle}>
            Поддержка всех фишек современного маркетплейса
          </span>
        </div>
        <div className={styles.cardGeneral}>
          <span className={styles.textCardStyle}>
            Поддержка всех фишек современного маркетплейса
          </span>
        </div>
        <div className={styles.cardStyleTwo}>
          <span className={styles.textCardStyle}>
            Поддержка всех фишек современного маркетплейса
          </span>
        </div>
      </div>
    </div>
  );
};
