import React from "react"
import {Link} from "react-router-dom"

export default function Landing (){

    return (
        <div className="landingContenedorGeneral">
            <div className="landingBloque1">
                <h1>Bienvenido/a a Mi proyecto DOGS</h1>
                <p>En esta pagina web podras encontrar una gran variedad de perros, podras observar y aprender, buscar y hasta crear tus perritos favorito</p>
                <p> Si deseas hacer eso y mucho mas, continua aqui:</p>
                <Link  to={"/home"}> 
                <button className="landingButtonHome">Home</button>
                </Link>
            </div>
            <div className="landingBloque2">
                <img src="/portada1.png" alt="img1" className="img1" />
                <img src="/portada2.png" alt="img2" className="img2" />
                <img src="/portada3.png" alt="img3" className="img3" />
            </div>
        </div>
    )
}

//client\public\portada3.png
