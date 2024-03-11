require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
/*
? Importa el módulo path, que proporciona utilidades para trabajar con rutas de archivos y directorios
*/
const path = require('path');
/*
? Extrae las variables de entorno del objeto process.env
*/
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

/*
? Define un arreglo modelDefiners para almacenar definiciones de modelos. 
*/
const modelDefiners = [];
/*
? Luego, lee todos los archivos en el directorio /models, filtra los archivos que no son .js o el archivo actual, 
? y requiere cada uno de ellos, agregándolos al arreglo modelDefiners. 
? Esto permite cargar dinámicamente todos los modelos definidos en el directorio /models
 Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
*/
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
/*
? Para cada definición de modelo en modelDefiners, se invoca la función pasando sequelize como argumento. 
? Esto registra los modelos con Sequelize.   
 Injectamos la conexion (sequelize) a todos los modelos
*/
modelDefiners.forEach(model => model(sequelize));
/*
? Luego, se transforman los nombres de los modelos para que comiencen con una letra mayúscula
 Capitalizamos los nombres de los modelos ie: product => Product
*/
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);
/*
? En sequelize.models están todos los modelos importados como propiedades
? Para relacionarlos hacemos un destructuring
*/
const { Dog, Temperaments } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Dog.belongsToMany(Temperaments, {through: "DogTemperaments"})
Temperaments.belongsToMany(Dog, {through: "DogTemperaments"})

/*
? Exporta todos los modelos registrados con Sequelize y la conexión sequelize para que puedan ser
? importados y utilizados en otros archivos de la aplicación. 
? Esto facilita la interacción con la base de datos desde diferentes partes de la aplicación.
*/
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
