import React from 'react';
import './Faq.css';
import CarrouselFaqComponent from '../CarrouselFaq/CarrouselFaqComponent';
import Enlace from '../buttons/Link';
import FaqDropdown from '../FaqDropdowns/FaqDropdown';
const FaqComponent = () => {
  return (

    <div className='FaqContainer'>
    <h2 id="premios">Premios</h2>
    <CarrouselFaqComponent />
    <div className='faqParticipaContainer'style={{
    backgroundImage: "url('/backgroundGRDS.png')",
    backgroundSize: "cover", // Para cubrir todo el div
    backgroundPosition: "center", // Centrar la imagen
    backgroundRepeat: "no-repeat" // Evitar que se repita
  }} >
    <Enlace estiloscomponent="participa  participa-white" enlaceClick="https://www.estelarbet.vip" textenlace="Participa aquí"/>
    </div>
    
    <FaqDropdown />
    
    </div>

  )
}

export default FaqComponent