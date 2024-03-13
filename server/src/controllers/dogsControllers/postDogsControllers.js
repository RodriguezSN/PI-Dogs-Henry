const {Dog, Temperament} = require("../../db")

const postDogsControllers = async(data)=>{

//Creamos el modelo del perro extrayendo los datos que recibimos por body

    const perro = {
        image: data.image,
        name: data.name,
        height: data.height,
        weight: data.weight,
        life_span: data.life_span
    }

    //verificamos si temperamentos es un Array y si contiene algo
    
    const temperament = Array.isArray(data.temperamentos) ? data.temperamentos : []

    //creamos el perro con los datos recibidos por body

    const dog = await Dog.create(perro)

}

module.exports = postDogsControllers