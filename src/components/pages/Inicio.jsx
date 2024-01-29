// import React from 'react'

import { Link } from "react-router-dom"

export const Inicio = () => {
  return (
    <div className="jumbo"> 
      <h1>Bienvenidos a mi Blog con React</h1>
      <p>Blog desarrollado con MERN Stack, donde subiré contenido sobre programación y la utilización del Framework de JavaScript ReactJS</p>
      <Link to="/articulos" className="button">Ver Artículos</Link>
    </div>
    
  )
}
