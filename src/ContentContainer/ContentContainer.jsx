import React from 'react'
import Title from '../ItemsContent/Title'
import HeroComponent from '../HeroComponent/HeroComponent'
import './contentContainer.css'
import Fecha from '../ItemsContent/fecha'
import TextContent from './../ItemsContent/TextContent'
import Enlace from '../buttons/Link'

const ContentContainer = () => {
  return (


    <div className='heroContainer'>
    <HeroComponent HeroImgSrc="/hero-img.png"/>
    <div className='heroContent'>
    <Fecha fechaInicio="dd.mm.aaaa" fechaTermino="dd.mm.aaaa"/>
    <Title TitleContent="GRDS X ESTELARBET, ¡GANAR TRAGAR GANAR!"  TitleType="h1"/>
    <TextContent className="text-content" TextContent="Sigue 3 pasos para ganar tu fav f*cking SMASH BURGER acompañado con su combo completo de papas y bebida"/>
    <Enlace estiloscomponent="participa  participa-pink " enlaceClick="https://www.estelarbet.vip" textenlace="Participa ahora" />
    </div>
    </div>


  )
}

export default ContentContainer