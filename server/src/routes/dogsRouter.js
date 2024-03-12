const {Router} = require("express")
const {getDogsHandlers} = require("../handlers/dogsHandlers/getDogsHandlers")
const dogsRouter = Router()

dogsRouter.get("/", getDogsHandlers)

module.exports = dogsRouter