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
    allowNull: false,
  },

  modelo: {
    type:Sequelize.STRING,
    allowNull: false,
  },

  cambio: {
    type:Sequelize.STRING,
    allowNull: false,
  },

  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  cor:{
    type: Sequelize.STRING,
    allowNull: false,
  },

  combustivel: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  descricao: {
    type: Sequelize.TEXT,
    allowNull: false,
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
    allowNull: false,
  },
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Webcar;