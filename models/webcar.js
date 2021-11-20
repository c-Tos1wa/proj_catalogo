const database = require("../database");
const Sequelize = require("sequelize");

const Webcar = database.define("carros", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  motor: {
    type: Sequelize.STRING,
  },

  modelo: {
    type:Sequelize.STRING,
    allowNull: false,
  },

  cambio: {
    type:Sequelize.STRING,
  },

  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  cor:{
    type: Sequelize.STRING,
  },

  combustivel: {
    type: Sequelize.STRING,
  },

  descricao: {
    type: Sequelize.TEXT,
  },

  valor: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  
  marca: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  ano: {
    type: Sequelize.STRING,
    allowNull: false
  },
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Webcar;