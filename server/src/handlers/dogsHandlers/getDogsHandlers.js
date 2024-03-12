const getDogsController = require("../../controllers/dogsControllers/getDogsControllers");

const getDogsHandlers = async (req,res)=>{
    try {
        const {id} = req.body;
        const response = await getDogsController(id)
        console.log(response) 
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    getDogsHandlers
}