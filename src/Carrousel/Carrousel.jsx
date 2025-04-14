import React, { useState, useEffect } from 'react';
import './Carrousel.css';

const slides = [
  {
    num: 1,
    text: "Regístrate en Estelarbet y reclama tu primer premio: unas PAPAS FRITAS gratis",
    img: "/papasFritas.png",
  },
  {
    num: 2,
    text: "Deposita por primera vez y recibe un bono del 100%",
    img: "/vaso.png",
  },
  {
    num: 3,
    text: "Juega tus slots favoritas y gana giros gratis",
    img: "/hamburgericon.png",
  }
  
];

const Carrousel = () => {
  const [current, setCurrent] = useState(0);
  const [slideAnimation, setSlideAnimation] = useState("slide-in-left");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const triggerAnimation = () => {
    setSlideAnimation("");
    setTimeout(() => setSlideAnimation("slide-in-left"), 10);
  };

  const goLeft = () => {
    triggerAnimation();
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goRight = () => {
    triggerAnimation();
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="carrouselContainer">
        {isMobile && (
          <button className="buttonLeft" onClick={goLeft}>
            <img src="/chevron-left.svg" alt="Anterior" />
          </button>
        )}

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`black-rounded ${isMobile && index === current ? slideAnimation : ''}`}
            style={{
              display: isMobile ? (index === current ? 'flex' : 'none') : 'flex'
            }}
          >
            <div className="contentWrapper">
              <span className="itemNum">{slide.num}</span>
              <p className="itemText">{slide.text}</p>
              <img className="itemImg" src={slide.img} alt={`Slide ${slide.num}`} />
            </div>
          </div>
        ))}

        {isMobile && (
          <button className="buttonRight" onClick={goRight}>
            <img src="/chevron-right.svg" alt="Siguiente" />
          </button>
        )}
      </div>

      {isMobile && (
        <div className="dotsContainer">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === current ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default Carrousel;
