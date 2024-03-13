const getTemperamentsC = require("../../controllers/temperamentsControllers/getTemperamentsC")

const getTemperaments = async (req,res)=>{
    try {
        const result = await getTemperamentsC()
        res.json(result)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = getTemperaments