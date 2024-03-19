import React from "react"
import {Link} from "react-router-dom"

export default function Landing (){

    return (
        <div>
            <div>
                <h1>Bienvenido/a a Mi proyecto DOGS</h1>
                <p>En esta pagina web podras encontrar una gran variedad de perros, podras observar y aprender, buscar y hasta crear tus perritos favorito</p>
                <p> Si deseas hacer eso y mucho mas, continua aqui:</p>
                <Link  to={"/home"}> Home</Link>
            </div>
        </div>
    )
}