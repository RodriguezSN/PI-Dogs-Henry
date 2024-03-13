const {Router} = require("express")
const getDogsHandlers = require("../handlers/dogsHandlers/getDogsHandlers")
const getIdDogHandlers = require("../handlers/dogsHandlers/getIdDogHandlers")
const getNameDogHandlers = require("../handlers/dogsHandlers/getNameDogHandlers")
const postDogsHandlers = require("../handlers/dogsHandlers/postDogsHandlers")
const dogsRouter = Router()

dogsRouter.get("/", getDogsHandlers)

dogsRouter.get("/:idRaza", getIdDogHandlers)

dogsRouter.get("/name", getNameDogHandlers)

dogsRouter.post("/", postDogsHandlers)

module.exports = dogsRouter