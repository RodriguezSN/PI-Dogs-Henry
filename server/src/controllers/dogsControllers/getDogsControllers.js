const axios = require("axios")
require('dotenv').config();
const {API_KEY} = process.env
const {Dog, Temperaments } = require("../../db")


const getDogsController = async (id)=>{
    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds`,{
        headers:{
            "x-api-key": API_KEY
        }
    })


    const newDataApi = []

    let newTemperament = []

    data.map( dog => {

        newTemperament = dog?.temperament?.split(",").map(temperament => temperament.trim())

        const newDog = {
            id: dog.id,
            imagen: dog.image,
            nombre: dog.name,
            altura: dog.height.metric,
            peso: dog.weight.metric,
            añosDeVida: dog.life_span
        }
        newDataApi.push(newDog)
    })
    
}

module.exports = getDogsController