require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());


// let listOfCars = [
//   {
//     cars: "Ford",
//     modelo: "Fusion SEL AWD",
//     img: "/img/pic01.png",
//     motor: "3",
//     cambio: "AUTOMÁTICO",
//     ano: "2011",
//     cor: "prata",
//     combustivel: "flex",
//     valor: "R$43.500",
//     descricao: "Veiculo completo, banco em couro, central multimidia synk2, cambio automatico de 6 velocidades"
//   },
//   {
//     cars: "Fiat",
//     modelo: "Ideia Adventure",
//     img: "/img/pic02.jpg",
//     motor: "3",
//     cambio: "automatizado",
//     ano: "2013/2014",
//     cor: "prata",
//     combustivel: "flex",
//     valor: "R$45.000",
//     descricao: "Teto solar panorâmico, cambio automatizado 5 velocidades"
//   },
//   {
//     cars: "New Fiesta",
//     modelo: "",
//     img: "/img/pic03.png",
//     motor: "3",
//     cambio: "automático",
//     ano:"2017",
//     cor: "prata",
//     combustivel: "flex",
//     valor: "R$22.900",
//     descricao: "Ar e direção"
//   }
// ];

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