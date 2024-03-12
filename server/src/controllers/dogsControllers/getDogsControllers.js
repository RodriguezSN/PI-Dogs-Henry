const axios = require("axios")
require('dotenv').config();
const {API_KEY} = process.env
const {Dog, Temperaments } = require("../../db")


const getDogsController = async ()=>{

    //? traigo todos los perros de la api

    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds`,{
        headers:{
            "x-api-key": API_KEY
        }
    })

//? en este array guardo los perros traidos desde la API
const newDataApi = []

//? los temperamentos en la API estan todos juntos en un texto.. los separo entre cada , y lo guardo en el array
    let newTemperament = []

//mapeo la data traida de la API    
    data.map( dog => {
//aqui separo los temperamentos que estan en un texto y lo guardo en un array que los separa entre cada , y elimina los espacios "trim"
        newTemperament = dog?.temperament?.split(",").map(temperament => temperament.trim())

        const newDog = {
            id: dog.id,
            imagen: dog.image,
            nombre: dog.name,
            altura: dog.height.metric,
            peso: dog.weight.metric,
            temperamentos: newTemperament,
            añosDeVida: dog.life_span,
            origin: "api"
        }
        newDataApi.push(newDog)
    })
    
    //*Perros de la DB
//el findALl es un metodo de sequelize 
    const dataDb = await Dog.findAll({
//include para buscar relaciones en otra tabla
        include:{
            //el nombre de que tabla debe buscar la relacion
            model: Temperaments,
            //que atributo de la tabla debe traer
            attributes: ["name"],
            //que atributos de la tabla intermedia debe traer.. [] no especificamos ninguno 
            through:{attributes:[]}
        }
    })
//en este array guardaremos los perros de la DB ya organizados 
    const newDataDb = []

    dataDb.map( dog => {
        const newData = {
            id: dog.id,
            imagen: dog.image,
            nombre: dog.name,
            altura: dog.height,
            peso: dog.weight,
            temperamentos: dog.temperaments?.map(temperament => temperament.nombre),
            añosDeVida: dog.life_span,
            origin: "db"
        }
        newDataDb.push(newData)
    })
    
    const response = {
        apiResult: newDataApi,
        dbResult: newDataDb
    }
    return response

}

module.exports = getDogsController