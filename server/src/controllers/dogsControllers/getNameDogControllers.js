const axios = require("axios")
require("dotenv").config()
const {API_KEY} = process.env
const {Sequelize, Op} = require("sequelize")
const {Dog, Temperament} = require("../../db")


const getNameDogController = async (name) =>{
console.log(name)
    const {data: dataApi = []} = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`,{
        headers:{
            "x-api-key": API_KEY
        }
    })


    const newDataApi = []
    let newTemperamentApi = []

    dataApi.map(dog =>{

        newTemperamentApi = dog.temperament?.split(",")
        const newImage =  `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
        const newDog = {
            id: dog.id,
            imagen: newImage,
            nombre: dog.name,
            altura: dog.height.metric,
            peso: dog.weight.metric,
            añosDeVida: dog.life_span,
            temperamentos:newTemperamentApi,
            origen: "api"

        }
        newDataApi.push(newDog)
    })

    const newDataDb = []

    if(name !== ""){
        const dataDb = await Dog.findAll({
            where:{
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include:[{
                model:Temperament,
                attributes:["name"],
                through:{attributes:[]}
            }]
        })
        dataDb?.map(dog =>{
            const newData = {
                id: dog.id,
                imagen: dog.image,
                nombre: dog.name,
                altura: dog.height,
                peso: dog.weight,
                temperamento: dog.temperaments?.map(temperament => temperament.name),
                añosDeVida: dog.life_span,
                origin:"db"
            }
            newDataDb.push(newData)
        })
    }

    const response = {
        apiResult: newDataApi,
        dbResult: newDataDb
    }
    return response

}
module.exports = getNameDogController