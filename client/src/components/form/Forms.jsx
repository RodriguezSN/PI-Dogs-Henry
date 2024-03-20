import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios"

export default function Form (){

    const [valor, setValor] = useState({
        imagen: "",
        nombre: "",
        altura: "",
        peso: "",
        temperamentos: [],
        añosDeVida: ""
    })

    const [temperamentosSeleccionados, setTemperamentosSeleccionados] = useState([])

    const allTemperaments = useSelector(state => state.allTemperaments)

    const handleChange = (event) => {
        const {name, value} = event.target
        setValor({
            ...valor,
            [name]: value
        })
    }

    const [altura, setAltura] = useState({
        min: "",
        max: ""
    })

    useEffect(() => {
        if(altura.alturaMin !== "" && altura.alturaMax !== ""){
            const newAltura = `${altura.alturaMin} - ${altura.alturaMax} m`
            setValor({
                ...valor,
                altura: newAltura
            })
        }
    },[altura])

    const [peso, setPeso] = useState({
        min: "",
        max: ""
    })

    useEffect(()=>{
        if(peso.pesoMin !== "" && peso.pesoMax !== ""){
            const newPeso = `${peso.pesoMin} - ${peso.pesoMax} Kg`
            setPeso({
                ...valor,
                peso: newPeso
            })
        }
    },[peso])

    const [añosDeVida, setAñosDeVida] = useState({
        min: "",
        max: ""
    })

    useEffect(()=>{
        if(añosDeVida.añosDeVidaMin !== "" && añosDeVida.añosDeVidaMax !== ""){
            const newAñosDeVida = `${añosDeVida.añosDeVidaMin} - ${añosDeVida.añosDeVidaMax} años`
            setValor({
                ...valor,
                añosDeVida: newAñosDeVida
            })
        }
    },[añosDeVida])

    useEffect(()=>{
        setValor({
            ...valor,
            temperamentos: temperamentosSeleccionados
        })
    },[temperamentosSeleccionados])

    
    const handleChangeMinMax = (event, setState) => {
        const {name, value} = event.target

        setState(prevSate => ({
            ...prevSate,
            [name]: value
        }))
    }

    const handleSelectChange = (event) => {
        const selectedTemperaments = Array.from(event.target.selectedOptions, option => option.value)
        setTemperamentosSeleccionados( prevSelectedTemperaments => [
            ...prevSelectedTemperaments,
            ...selectedTemperaments
        ])
    }

    const handleSave = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/dogs`, valor,{
                Headers: {
                    "Content-Type": "application/json" 
                }
            })
            alert("Datos guardados correctamente")
        } catch (error) {
            console.error("Error:", error)
            alert("Error al guardar los datos")
        }
    }


    return(
        <div className="formContenedorGeneral">
            //* Bloque 1
            <div className="FormBloque1">
                <h1>¡Añade tu propio perro!</h1>
                <img src="/formDog.png" alt="Perrito sobre el form" width={"120px"} />
            </div>
            //* Bloque 2
            <div className="FormBloque2">
                //* Input 1
                <div className="FormInput">
                    <label htmlFor="nombre">Nombre: </label>
                    <input className="inputLargo" id="nombre" name="nombre" type="text" placeholder="Maax" onChange={handleChange}  />
                </div>
                //* Input 2
                <div className="FormInput">
                    <label htmlFor="imagen">Imagen(url):</label>
                    <input className="inputLargo" id="imagen" name="imagen" type="text" placeholder='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fes%2Fsearch%3Fq%3Dperro%2Bgrande&psig=AOvVaw2OtuLj0NDHtgUTOIScNPs6&ust=1709128558072000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDf3JbWy4QDFQAAAAAdAAAAABAb...' onChange={handleChange} />
                </div>
                //* Input 3
                <div className="FormInput">
                    <label htmlFor="alturaMin">Altura: </label>
                    <div className="contenedorInputChico">
                        <input className="inputChico" type="number" name="alturaMin" id="alturaMin" placeholder="Min" onChange={(e) => handleChangeMinMax(e, setAltura) } />
                        <input className="inputChico" type="number" name="alturaMax" id="alturaMax" placeholder="Max" onChange={(e) => handleChangeMinMax(e, setAltura)} />
                    </div>
                </div>
                //* Input 4
                <div className="FormInput">
                    <label htmlFor="pesoMin">Peso: </label>
                    <div className="contendedorInputChico">
                        <input className="inputChico" type="number" name="pesoMin" id="pesoMin" placeholder="Min" onChange={(e) => handleChangeMinMax(e, setPeso)} />
                        <input className="inputChico" type="number" name="pesoMax" id="pesoMax" placeholder="Max" onChange={(e) => handleChangeMinMax(e, setPeso)} />
                    </div>
                </div>
                //* Input 5
                <div className="FormInput">
                    <label htmlFor="añosDeVidaMin">Años de vida: </label>
                    <div className="contendedorInputChico">
                        <input className="inputChico" type="number" name="añosDeVidaMin" id="añosDeVIdaMin" placeholder="Min" onChange={(e) => handleChangeMinMax(e, setAñosDeVida)} />
                        <input className="inputChico" type="number" name="añosDeVidaMax" id="añosDeVidaMax" placeholder="Max" onChange={(e) => handleChangeMinMax(e, setAñosDeVida)} />
                    </div>
                </div>
                //* Input 6
                <div className="FormInput">
                    <label htmlFor="temperamentos"> Temperamentos: </label>
                    <select className="FormSelect" name="temperamentos" id="temperamentos" onChange={handleSelectChange}>
                        <option value="default">-</option>
                        {
                            allTemperaments.map(temp => (
                                <option key={temp.id} value={temp.nombre}>{temp.nombre}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="FormContenedorTemperamentos">
                    {
                        temperamentosSeleccionados.map((temp, index) =>(
                            <span key={index}>{temp}</span>
                        ))
                    }
                </div>
            </div>
            //* Bloque 3 
            <div className="FormBloque3">
                <button className="ButtonDelete"> Delete</button>
                <button className="ButtonSave" onClick={handleSave}>Save</button>
            </div>
        </div>
    )

}