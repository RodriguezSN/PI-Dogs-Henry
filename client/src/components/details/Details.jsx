import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetail, getDogById } from "../../redux/actions";


export default function Details () {

    const {origen, id} = useParams()
    const perroFinal = useSelector(state => state.detailDog)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDogById(origen, id))

        return ()=>{
            dispatch(cleanDetail())
        }
    },[dispatch, id])

    return (
        <div className="detailsContenedorGeneral">

            <div className="detailsContenedorImg">
                <div className="detailsContenedorimagen">
                    <img className="detailsImage" src={perroFinal?.imagen} alt="" />
                    <span className="detailsId">{perroFinal?.id}</span>
                </div>
            </div>

            <div className="detailsContenedorTexto">
                <h1>{perroFinal?.nombre}</h1>
                <div className="DetailsDetails">
                    //? Altura
                    <div className="ditailsDitailsAltura">
                        <img src="/altura.png" alt="icono de altura" width={"30px"} title="Altura" />
                        <span>{perroFinal?.altura} cm</span>
                    </div>
                    //? Peso
                    <div className="detailsDitailsPeso">
                        <img src="/peso.png" alt="icono de peso" width={"30px"} title="Peso" />
                        <span>{perroFinal?.peso} Kg</span>
                    </div>
                    //? Edad
                    <div className="detailsDetailsAñosDeVida">
                        <img src="/añosDeVida.png" alt="icono de años de vida" width={"30px"} title="Años de vida" />
                    </div>
                </div>
                <div className="detailsTemperaments">
                    {perroFinal?.temperamentos?.map((temperamento,index) => (
                        <span className="temperamento" key={index}>{temperamento}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}