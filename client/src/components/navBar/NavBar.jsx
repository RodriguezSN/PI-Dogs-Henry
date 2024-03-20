import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterOrigin, filterTemperament, getAllTemperaments, getDogByName, orderDogs } from "../../redux/actions";
import { Link } from "react-router-dom";



export default function NavBar ({setPage}){

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                dispatch(getAllTemperaments)
            } catch (error) {
                console.error("Error al cargar los temperamentos: ", error)
            }
        }
        fetchData()
    },[dispatch])

    const allTemperaments = useSelector(state => state.allTemperaments)
    
    const onSearch = (n) => {
        dispatch(getDogByName(n))
    }

    const handleChange = (e) => {
        const newName = e.target.value
        setName(newName)
        onSearch(newName)
    }


    const handlerChange = (event) =>{
        dispatch(orderDogs(event.target.value))
    }

    const handleChangeTemp = (event) =>{
        dispatch(filterTemperament(event.target.value))
        setPage(1)
    }

    const handleChangeOrigin = (event) => {
        dispatch(filterOrigin(event.target.value))
    }

    return (
        <div className="navBarContenedor">
                <div className="navBarIzquierda">
                    <h1>PI DOGS</h1>
                    <img src="/pata.png" alt="Huella de perro" className="huella" />
                </div>  

                <div className="navBarCentro">

                    <div className="ordenamiento">
                        <label htmlFor="ordenamiento">Ordenamiento</label>
                        <select name="ordenamiento" id="ordenamiento" defaultValue={"default"} onChange={handlerChange}>
                            <option value="default">-</option>
                            <option value="ascendente">A-Z</option>
                            <option value="descendente">Z-A</option>
                            <option value="menosPeso">Menos peso</option>
                            <option value="masPeso">Mas peso</option>
                        </select>
                    </div>

                    <div className="filtro">
                        <label htmlFor="temperamentos">Filtros: </label>
                        <select name="temperamentos" id="temperamentos" defaultValue={"default"} onChange={handleChangeTemp}>
                            <option value="default">-</option>
                            {
                                allTemperaments.map(temp => (
                                    <option value={temp.nombre} key={temp.id}>{temp.nombre}</option>
                                ))
                            }
                        </select>
                        
                        <select name="origen" id="origen" defaultValue={"default"} onChange={handleChangeOrigin}>
                            <option value="default">-</option>
                            <option value="api">Api</option>
                            <option value="db">DB</option>
                        </select>

                    </div>
                </div>
                <div className="navBarDerecha">
                     <input 
                        type="text"
                        id="search_input"
                        className="searchInput"
                        placeholder="Search..."
                        value={name}
                        onChange={handleChange}
                     />       
                    <Link to={"/form"}>
                        <button>Crear</button>
                    </Link>
                </div>
        </div>
    )
}