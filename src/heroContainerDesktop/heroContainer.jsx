import React from 'react';
import styles from './HeroContainer.module.css';

const HeroContainer = () => {
  return (
    <div className={styles['hero-wrapper']}>
      <img className={styles['hero-image']} src="/hero-img.png" alt="" />

      <svg
        className={`${styles['hero-svg']} ${styles.borde}`}
        data-name="Capa 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1921 120.74"
      >
        <path
          className={styles['cls-1']}
          d="M.5.55v119.69h1920V.55c-281.14,28.16-589.85,46.59-922.44,47.89C636.33,49.85,302.23,30.77,.5.55Z"
        />
      </svg>

      <div className={styles['hero-content']}>
        <p className={styles['hero-date']}>📅 DD.MM.AAAA - DD.MM.AAAA</p>
        <h1 className={styles['hero-title']}>GRDS X ESTELARBET, ¡GANAR TRAGAR GANAR!</h1>
        <p className={styles['hero-subtitle']}>
          Sigue 3 pasos para ganar tu fav f*cking SMASH BURGER acompañado con su combo completo de papas y bebida
        </p>
        <button className={styles['hero-button']}>Participa aquí</button>
      </div>
    </div>
  );
};

export default HeroContainer;
