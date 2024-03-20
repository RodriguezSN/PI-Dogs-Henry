import React from "react";
import Cards from "../cards/Cards";
import "./Home.css"


export default function Home ({setPage, page}){

    return (
        <div className="homeContenedor">
            <Cards setPage={setPage} page={page} />
            <div className="espaciado"></div>
        </div>
    )
}