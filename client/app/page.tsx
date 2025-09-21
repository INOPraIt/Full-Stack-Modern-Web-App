"use client";

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
      <button className={styles.button}>Перейти</button>
      <div className={styles.cardsWelcome}>
        <div className={styles.cardStyle}>dd</div>
        <div className={styles.cardGeneral}></div>
        <div className={styles.cardStyleTwo}>dd</div>
      </div>
    </div>
  );
};
