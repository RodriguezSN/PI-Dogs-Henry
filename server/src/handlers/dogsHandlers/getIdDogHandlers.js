const getIdDogControllers = require("../../controllers/dogsControllers/getIdDogControllers")

const getIdDogHandlers = async (req,res)=>{
    try {
        const { idRaza } = req.params
        console.log(idRaza)
        const response = await getIdDogControllers(idRaza)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send("No se pudo cargar los temperamentos en la DB", error.message)
    }


}

module.exports = getIdDogHandlers