import {useState} from 'react'

export const useForm = ( objetoInicial ={}) =>{
    const [formulario, setFormulario] = useState(objetoInicial);
    
    const serializarFormulario =(formulario)=>{
        const formData = new FormData(formulario)
        

        const objetoCompleto ={}

        // Recorremos formData y vamos creando en cada iteración 
        // con el name y el value de ese dato del campo del formulario
        // name es el metodo que le declaramos al input como campo de entrada
        // value devuelve el valor introducido en el campo
        for(let [name, value] of formData){
            objetoCompleto[name] = value
        }
        return objetoCompleto
    }

    const enviado = (e) =>{
        e.preventDefault()
        
        
        let curso = serializarFormulario(e.target)
        setFormulario(curso)
        // agregar clase enviado
        document.querySelector(".codigo").classList.add("enviado")
    }
    const cambiado = ({target}) =>{
        const {name, value} = target
        setFormulario({
            ...formulario,
            [name]: value
        })
    }
    return {
        formulario,
        enviado,
        cambiado
    }

}