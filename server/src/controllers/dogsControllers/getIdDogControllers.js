const axios = require("axios")
require("dotenv").config()
const {API_KEY} = process.env
const {Dog, Temperaments} = require("../../db")

const getIdDogControllers = async (idRaza) =>{

    const {data : dataApi = []} = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`,{
        headers:{
            "x-api-key": API_KEY
        }
    })
    
    const newTemperament = dataApi?.temperament?.split(",")
    const newImage = `https://cdn2.thedogapi.com/images/${dataApi?.reference_image_id}.jpg`
    
    const newDataApi = {
        id: dataApi.id,
        image: newImage,
        nombre: dataApi.name,
        altura: dataApi.height.metric,
        peso: dataApi.weight.metric,
        temperamento: newTemperament,
        añosDeVida: dataApi.life_span,
        origin:"api"
    }

    let dataDb = await Dog.findOne({
        where:{ id: idRaza},
        include:[{
            model: Temperaments,
            attributes: ["name"],
            through: {attributes: []}
        }]
    })
   
    dataDb = dataDb || {}

    const newDataDb = {
        id: dataDb.id,
        imagen: dataDb.image,
        nombre: dataDb.name,
        altura: dataDb.height,
        peso: dataDb.weight,
        temperamento: dataDb.temperaments?.map(temperament => temperament.name),
        añosDeVida: dataDb.life_span,
        origin: "db"
    }

    const response = {
        apiResult: newDataApi,
        dbResult: newDataDb
    }
    return response
}

module.exports = getIdDogControllers