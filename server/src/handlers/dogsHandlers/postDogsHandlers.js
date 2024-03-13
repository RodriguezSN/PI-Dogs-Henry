const postDogsControllers = require("../../controllers/dogsControllers/postDogsControllers")

const postDogsHandlers = async (req,res)=>{
    try {
        const data = req.body
        const result = postDogsControllers(data)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = postDogsHandlers