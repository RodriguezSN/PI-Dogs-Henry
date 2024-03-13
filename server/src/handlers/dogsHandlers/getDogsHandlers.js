const getDogsController = require("../../controllers/dogsControllers/getDogsControllers");

const getDogsHandlers = async (req,res)=>{
    try {
        const response = await getDogsController()
        res.status(200).json(response) 
    } catch (error) {
        res.status(400).json(error.message)
        // res.status(400).send("no anduvo")
        // res.status(400).send("Error al obtener datos de los perros", error.message)
    }
}


module.exports = getDogsHandlers
