const {Router} = require("express")
const getTemperaments = require("../handlers/temperamentsHandlers/getTemperamentsH")

const temperamentsRouter = Router()

temperamentsRouter.get("/", getTemperaments )

module.exports = temperamentsRouter