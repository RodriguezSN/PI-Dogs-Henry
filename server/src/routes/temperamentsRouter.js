const {Router} = require("express")

const temperamentsRouter = Router()

temperamentsRouter.get("/", (req,res)=>{
    res.send("hola")
})

module.exports = temperamentsRouter