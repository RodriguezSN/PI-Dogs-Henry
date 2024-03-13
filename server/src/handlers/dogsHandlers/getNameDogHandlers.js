const getNameDogController = require("../../controllers/dogsControllers/getNameDogControllers")


const getNameDogHandlers = async (req,res) =>{
    try {
        const name  = req.query.name
        const response = await getNameDogController(name)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error.message)
        // res.status(400).json("No se encontro al perro con ese nombre", error.message)
    }
}

module.exports = getNameDogHandlers