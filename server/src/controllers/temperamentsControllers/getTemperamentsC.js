const axios = require("axios")
require("dotenv").config()
const { API_KEY } = process.env
const {Dog, Temperaments} = require("../../db")

const getTemperamentsC = async ()=>{

    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds`,{
        headers:{
            "x-api-key": API_KEY
        }
    })


    //se utiliza Set porque sera mas facil tener un conjunto de elementos sin duplicados
    const temperamentSet = new Set()

    data.forEach(dog =>{

        if(dog.temperament){

         const temperamentArray = dog.temperament.split(", ")
         
         temperamentArray.forEach(temperament => {
            temperamentSet.add(temperament)
         })
        }
    })

    //lo pasamos de conunto(set) a array
    const uniqueTemperaments = Array.from(temperamentSet)

    for(const temperament of uniqueTemperaments){
        //hacemos una verificacion si existe algun temperamento antes de añadirlo

        const existingTemperament = await Temperaments.findOne({where: {name: temperament}})

        if(!existingTemperament){
            await Temperaments.create({name: temperament})
        }
    }
    //recuperamos los datos en la DB para mostrarlos com respuesta

    const allTemperaments = await Temperaments.findAll()

    return allTemperaments
}

module.exports = getTemperamentsC