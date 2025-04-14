import React from 'react'

import Search from '../search/Search';
import SearchDesktop from '../search/SearchDesktop'
import useIsMobile from '../Hooks/useIsMobile'
import './StepContainer.css';
import Tabs from '../Tabs/Tabs';
import Carrousel from '../Carrousel/Carrousel';

  

const StepContainer = () => {
  const isMobile = useIsMobile();
  return (
<>
 
    <div className='StepContainer'>
      <Tabs />
      <h2 id='pasos'>Pasos a seguir</h2>
      <Carrousel/>
      
      {isMobile ? <Search /> : <SearchDesktop/>}

      
      <p className='stepText'>Promoción válida para mayores de 18 años en todo el territorio nacional y exclusivamente a través de www.urldelapromo.com, desde el 1 de marzo hasta el 30 de junio de 2025. Premios a repartir: 200 smash burgers, 200 papas fritas, 1.200 bebidas. Descubre un mundo de aventuras en la selva amazónica, donde podrás explorar paisajes exóticos y conocer especies únicas. Disfruta de actividades emocionantes como el senderismo, la observación de aves y la pesca en ríos cristalinos, todo mientras te relajas en acogedoras cabañas rodeadas de naturaleza.</p>
    </div>
    </>
  )
}

export default StepContainer