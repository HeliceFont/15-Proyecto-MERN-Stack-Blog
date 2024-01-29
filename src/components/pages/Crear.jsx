// import React from 'react'
import { useState } from "react"
import { useForm } from "../../hooks/useForm"
import { Global } from "../../helpers/Global"
import { Peticion } from "../../helpers/Peticion"


export const Crear = () => {

  const {formulario, cambiado} = useForm ({})
  const [resultado, setResultado] = useState("no_enviado")
  const guardarArticulo = async (e) => {
    try {
      e.preventDefault();
  
      let nuevoArticulo = formulario;
  
      const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);
  
      if (datos.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
  
      const fileInput = document.querySelector("#file0");
      console.log(fileInput.name);
  
      if (datos.status === "success" && fileInput.files[0]) {
        setResultado("guardado");
  
        const formData = new FormData();
        formData.append('file0', fileInput.files[0], fileInput.files[0].name);
  
        const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);
  
        if (subida.status === "success") {
          setResultado("guardado");
        } else {
          setResultado("error");
        }
  
        console.log(subida.datos);
      } else {
        setResultado("error");
      }
    } catch (error) {
      console.error("Hubo un error:", error);
      setResultado("error");
    }
  };

  return (
    <div className="jumbo">
      <h1>Crear articulo</h1>
      <p>Formulario para crear un articulo</p>

      <strong>{resultado == "guardado" ? "Articulo guardado con exito!" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>

      {/* Montar Formulario */}
      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo" >Titulo</label>
          <input type="text" name="titulo" id="titulo" onChange={cambiado} />
        </div>

        <div className="form-group">
          <label htmlFor="contenido" >Contenido</label>
          <textarea type="text" name="contenido" id="contenido" onChange={cambiado} />
        </div>

        <div className="form-group">
          <label htmlFor="file0" >Imagen</label>
          <input type="file" name="file0" id="file0" onChange={cambiado}/>
        </div>

        <input type="submit" value="Guardar" className="btn btn-succes"/>
      </form>


    </div>
  )
}
