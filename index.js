const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let cars = [];

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/cadastro", (req, res) => {
  res.render('cadastro');
});

app.get("/informacoes", (req, res) => {
  res.render('informacoes');
});

app.post("/subscription", (req, res) => {
  const data = req.body;
  cars.push(data)
  res.redirect("/")
})

app.get("/details/:id", (req, res) => {
  const id = req.params.id;
  const dataById = cars[id];
  res.render('details', { listById: dataById });
});

app.get("/new_cadastro", (req, res) => {
  res.render('newCadastro');
});

app.get("/deletar", (req, res) => {
  res.render('delete');
});

app.listen(port, () => console.log(`Servidor operando em http://localhost:${port}`))