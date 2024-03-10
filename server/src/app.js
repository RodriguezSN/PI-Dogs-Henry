const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

/*
? Configura el middleware bodyParser.urlencoded para analizar los cuerpos de las
? solicitudes entrantes en un middleware antes de los manejadores de ruta, 
? lo que permite acceder a los datos enviados en el cuerpo de la solicitud a través
? de req.body. La opción extended: true permite el análisis de datos más complejos, 
? como objetos y matrices, mientras que limit: '50mb' establece el tamaño máximo del
? cuerpo de la solicitud a 50 megabytes.
*/
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
/*
? Configura el middleware cookieParser para analizar las cookies de las solicitudes entrantes en un middleware 
? antes de los manejadores de ruta, lo que permite acceder a las cookies a través de req.cookies
*/
server.use(cookieParser());

server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);
/*
? Dentro del middleware, se establece el estado de la respuesta HTTP basado en el estado del
? error capturado (err.status o 500 por defecto) y se envía el mensaje de error (err.message o el 
? objeto de error err en sí mismo) como respuesta. Esto permite que el cliente reciba información 
? sobre el error que ocurrió.
*/
// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
