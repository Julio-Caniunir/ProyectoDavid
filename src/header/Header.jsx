import React from 'react'
import Brand from '../brand/Brand'
import Enlace from '../buttons/Link';


const Header = () => {
  return (
   <header >

   <Brand logoSrcProvider="./../../public/logoProvider.png" logoSrcEstelarbet="./../../public/logoEstelarbet.png"/>
   
   <Enlace estiloscomponent="participa participa-black" enlaceClick="https://www.estelarbet.vip" textenlace="Participa ahora" />

   </header>
  )
}

export default Header 