import React, { useState, useEffect } from 'react';
import styles from './CarrouselFaq.module.css';

const items = [
  {
    name: "Smash burger",
    image: "/hamburger.png",
  },
  {
    name: "Vaso de bebida",
    image: "/vasodebebida.png",
  },
  {
    name: "Papas fritas",
    image: "/comboGRDS.png",
  },
];

const CarrouselFaqComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState(styles.slideInLeft);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerAnimation = () => {
    setAnimationClass("");
    setTimeout(() => setAnimationClass(styles.slideInLeft), 10);
  };

  const goLeft = () => {
    triggerAnimation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goRight = () => {
    triggerAnimation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className={styles.carrouselContainer}>
        {isMobile && (
          <button className={styles.buttonLeft} onClick={goLeft}>
            <img src="/chevron-left.svg" alt="Anterior" />
          </button>
        )}

        <div id="faq-items" className={styles.itemsWrapper}>
          {items.map((item, index) => {
            const isVisible = !isMobile || index === currentIndex;
            return (
              <div
                key={index}
                className={`${styles.ItemContainer} ${isMobile && index === currentIndex ? animationClass : ''}`}
                style={{
                  visibility: isMobile && !isVisible ? 'hidden' : 'visible',
                  position: isMobile && !isVisible ? 'absolute' : 'relative'
                }}
              >
                <div
                  className={styles.faqItem}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>

        {isMobile && (
          <button className={styles.buttonRight} onClick={goRight}>
            <img src="/chevron-right.svg" alt="Siguiente" />
          </button>
        )}
      </div>

      {isMobile && (
        <div className={styles.dotsContainer}>
          {items.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default CarrouselFaqComponent;
