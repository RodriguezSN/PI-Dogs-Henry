import React  from "react";
import { Link } from "react-router-dom";


export default function Card ({id, imagen, nombre, temperamentos, peso, origen}){

    return(
        <div className="cardContenedor">
            <div className="cardImg">
                <Link to={`/detail/${origen}/${id}`}>
                <img src={imagen ? imagen : ""} alt="" width={"100px"} />
                </Link>
            </div>
            <h3>{nombre}</h3>
            <div className="temperamentosContenedor">
                {
                    temperamentos?.map((temperamento, index) => (
                        <span key={index} className={temperamento}>{temperamento}</span>
                    ))
                }
            </div>
            <div className="CardPeso">
                <img src="/peso.png" alt="icono de peso" width={"30px"} title="Peso" />
                <span>{peso} kg</span>
            </div>
        </div>
    )
}