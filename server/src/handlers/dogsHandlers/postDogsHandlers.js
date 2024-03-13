
const postDogsHandlers = async (req,res)=>{
    try {
        const data = req.body
        const result = postDogsHandlers(data)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = postDogsHandlers