const {Router} = require("express")
const {getDogsHandlers} = require("../handlers/dogsHandlers/getDogsHandlers")
const getIdDogHandlers = require("../handlers/dogsHandlers/getIdDogHandlers")
const dogsRouter = Router()

dogsRouter.get("/", getDogsHandlers)

dogsRouter.get("/:idRaza", getIdDogHandlers)

module.exports = dogsRouter