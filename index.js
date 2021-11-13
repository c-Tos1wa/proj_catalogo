const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let list = [];

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/home", (req, res) => {
  res.render('home');
});

app.get("/cadastro", (req, res) => {
  res.render('cadastro');
});

app.get("/informacoes", (req, res) => {
  res.render('informacoes');
});

app.post("/sent", (req, res) => {
  const data = req.body;
  list.push(data)
  res.redirect("/home")
})

app.get("/details/:id", (req, res) => {
  const id = req.params.id;
  const dataById = list[id];
  res.render('details', { listById: dataById });
});

app.get("/new_cadastro", (req, res) => {
  res.render('newCadastro');
});

app.get("/deletar", (req, res) => {
  res.render('delete');
});

app.listen(port, () => console.log(`Servidor operando em http://localhost:${port}`))