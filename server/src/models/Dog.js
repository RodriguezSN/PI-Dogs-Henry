const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, //genera un UUID automatico
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    height:{
      type: DataTypes.STRING,
      allowNull: true
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: true
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      timestamps:false
    }
)};
