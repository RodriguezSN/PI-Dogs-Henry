import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs } from "../../redux/actions";
import "./Cards.css"

export default function Cards({setPage, page}){

    const allDogs = useSelector(state => state.allDogs)

    const dispatch = useDispatch()

    const [loanding, setLoanding] = useState(true)

    useEffect(()=>{
        const fetchData = async ()=> {
            try {
                dispatch(getAllDogs())
                .then(()=> {setLoanding(false)}) //cambia a false cuando se hayan cargado los datos
            } catch (error) {
                console.log("Error en los datos:", error)
            }
        }
        fetchData()
    },[dispatch])

    // PAGINADO

    const dogsPerPage = 8

    const startIndex = (page - 1) * dogsPerPage
    const endIndex = startIndex + dogsPerPage

    const nextPage = () => {
        setPage( page + 1)
    }

    const prevPage = () => {
        setPage( page - 1)
    }

    const goToFirsPage = () => {
        setPage(1)
    }

    const goTolastPage = () => {
        const totalPages = Math.ceil(allDogs.length / dogsPerPage)
        setPage(totalPages)
    }


    return (
        <div className="cardsContenedor">
              {
                loanding ? (
                    <div className="contenedorCargando">
                        <img src="/cargando.gif" alt="cargando" width={"200px"} className="cargando" />
                    </div>
                ) : (
                    <div>
                        {
                            allDogs.length > 0 ? (
                                allDogs.slice(startIndex, endIndex).map( (dog, index) => (
                                    <Card {...dog} key={index}></Card>
                                ))
                            ) : (
                                <h1>No hay coincidencias</h1>
                            )
                        }
                        <div className="buttonPrevSig">
                            <button onClick={goToFirsPage} disabled={page === 1}>◄◄</button>
                            <button onClick={prevPage} disabled={page === 1}>◄</button>
                            <span className="textPage">{page}</span>
                            <button onClick={nextPage} disabled={endIndex >= allDogs.length}>►</button>
                            <button onClick={goTolastPage} disabled={endIndex >= allDogs.length}>►►</button>
                        </div>
                    </div>
                )
              }  
        </div>
    )
}