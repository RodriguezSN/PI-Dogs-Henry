const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./dogsRouter");
const temperamentsRouter = require('./temperamentsRouter');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogsRouter)

router.use("/temperaments", temperamentsRouter)

module.exports = router;



//https://api.thedogapi.com/v1/breeds?api_key=live_IqZNiKr6BFgfNpLlwKvo62W1jZe7Z47IwD6AvNE5OB7DepR75jCrrleM0bWcK9KA

