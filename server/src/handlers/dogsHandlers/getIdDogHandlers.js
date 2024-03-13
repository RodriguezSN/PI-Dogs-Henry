const getIdDogControllers = require("../../controllers/dogsControllers/getIdDogControllers")

const getIdDogHandlers = async (req,res)=>{
    try {
        const { idRaza } = req.params
        const response = await getIdDogControllers(idRaza)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message)
        // res.status(400).send("No se pudo buscar perro por Raza", error.message)
    }


}

module.exports = getIdDogHandlers