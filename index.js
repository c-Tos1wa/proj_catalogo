const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render('index');
});

app.get("/", (req, res) => {
  res.render('home');
});

app.get("/form", (req, res) => {
  res.render('new');
});

app.get("/details", (req, res) => {
  res.render('details');
});

app.get("/reformulate", (req, res) => {
  res.render('newCatalog');
});

app.get("/delete", (req, res) => {
  res.render('delete');
});

app.listen(port, () => console.log(`Servidor operando em http://localhost:${port}`))