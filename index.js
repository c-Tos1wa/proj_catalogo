require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const Cars = require('./models/webcar');

let msg = "";

app.get("/", async(req, res) => {
  const cars = await Cars.findAll();

  setTimeout (() => {
    msg = ""
  }, 5000)
  res.render('index', {
    cars,
    msg
  });
});

app.get("/cadastro", (req, res) => {
  res.render('cadastro', { msg })
});

app.post("/subscription", async (req, res) => {
  const { marca, modelo, imagem, motor, cambio, descricao, ano, cor, combustivel, valor } = req.body;
  
  if(!marca) {
    res.render("cadastro", {
      msg: 'Cadastre a marca do carro!!!'
    })
  }
  else if ( !modelo ) {
    res.render("cadastro", {
      msg: 'Cadastre o modelo do seu carro!!!'
    })
  } else if ( !imagem ) {
    res.render("cadastro", {
      msg: 'Insira uma imagem do seu veículo!!!'
    }) 
  } else if ( !valor ) {
    res.render("cadastro", {
      msg: "Insira o valor que quer vender seu carro!!!"
    })
  } else if ( !ano ) {
    res.render("cadastro", {
      msg: "Escreva o ano do seu carro!!!"
    })
  }
  else {
    try {
      const carros = await Cars.create({
        marca, modelo, imagem, motor, cambio, descricao, ano, cor, combustivel, valor
      });
      res.render("cadastro", {
        carros, 
        msg: 'Seu carro foi cadastrado com sucesso' 
      });
      
    } catch(err) {
      console.log(err);

      res.render("cadastro", {
        msg: "Ocorreu um erro ao cadastrar!"
      })
    }
  } res.redirect('/')
});

app.get("/detalhes/:id", async(req, res) => {
  const cars = await Cars.findByPk(req.params.id);
  
  res.render('detalhes', { 
    cars 
  });
});

app.get("/new_cadastro", (req, res) => {
  res.render('newCadastro');
});

app.get("/deletar", (req, res) => {
  res.render('delete');
});

app.listen(port, () => console.log(`Servidor operando em http://localhost:${port}`))