require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const Cars = require('./models/webcar');
const CarById = require('./models/webcar');

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
  res.render('cadastro');
});


app.post("/subscription", (req, res) => {
  const data = req.body;
  listOfCars.push(data)
  msg = `Seu ${data.marca} ${data.modelo} foi cadastrado. Agradecemos pela preferência`
  res.redirect("/")
})

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