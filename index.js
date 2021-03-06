require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const Cars = require('./models/webcar');

// Função para temporizar mensagem em 5 segundos.

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

// Inserir dados no banco de dados.


app.get("/cadastro", (req, res) => {
  setTimeout (() => {
    msg = ""
  }, 5000)
  res.render('cadastro', { 
    msg 
  })
});

app.post("/subscription", async (req, res) => {
  const { marca, modelo, imagem, motor, cambio, descricao, ano, cor, combustivel, valor } = req.body;

  // Veficação de campos obrigatórios não preenchidos.

  if(!marca) {
    res.render("cadastro", {
      msg: 'Informe a marca do veículo!!!'
    })
  }
  else if ( !modelo ) {
    res.render("cadastro", {
      msg: 'Informe o modelo do veículo!!!'
    })
  } else if ( !imagem ) {
    res.render("cadastro", {
      msg: 'Insira o link da imagem do veículo!!!'
    }) 
  } else if ( !valor ) {
    res.render("cadastro", {
      msg: "Insira o valor que deseja receber pelo seu veículo!!!"
    })
  } else if ( !ano ) {
    res.render("cadastro", {
      msg: "Insira o ano do veículo!!!"
    })
  }

  // Validação de erro.

  else {
    try {
      const carros = await Cars.create({
        marca, modelo, imagem, motor, cambio, descricao, ano, cor, combustivel, valor
      });

      setTimeout (() => {
        msg = ""
      }, 5000)

      res.render("cadastro", {
        carros, 
        msg: 'Veículo cadastrado com sucesso' 
      });
      
    } catch(err) {
      console.log(err);

      res.render("cadastro", {
        msg: "Opa! Ocorreu um erro ao cadastrar!"
      })
    }
  } 
  
});

// Mostra um registro específico do banco de dados.

app.get("/detalhes/:id", async(req, res) => {
  const cars = await Cars.findByPk(req.params.id);
  
  res.render('detalhes', { 
    cars 
  });
});



// Mostra registro do banco de dados a ser editado.
app.get("/editar/:id", async (req, res) => {
  const cars = await Cars.findByPk(req.params.id);
  
  setTimeout (() => {
    msg = ""
  }, 5000)

  
  res.render('editar', {
    cars, msg
  });
});

// Editar registro no banco de dados.
app.post("/editar/:id", async (req, res) => {
  const cars = await Cars.findByPk(req.params.id);
  
  const { marca, modelo, imagem, motor, cambio, descricao, ano, cor, combustivel, valor } = req.body;
  
  cars.marca = marca;
  cars.modelo = modelo;
  cars.imagem = imagem;
  cars.motor = motor;
  cars.cambio = cambio;
  cars.descricao = descricao;
  cars.ano = ano;
  cars.cor = cor;
  cars.combustivel = combustivel;
  cars.valor =  valor;
  
  const carroEditado = await cars.save();
  
  setTimeout (() => {
    msg = ""
  }, 5000)
  
  res.render("editar", {
    cars: carroEditado,
    msg: "Editado com sucesso!",
  });
  
  // res.redirect("/editar")
});

// Deletar registro do banco de dados.

app.get("/deletar/:id", async (req, res) => {
  const cars = await Cars.findByPk(req.params.id);

  if (!cars) {
    res.render("deletar", {
      msg: "Veículo não encontrado!",
    });
  }

  setTimeout (() => {
    msg = ""
  }, 5000)

  res.render("deletar", {
    cars, msg
  });
});

app.post("/deletar/:id", async (req, res) => {
  const cars = await Cars.findByPk(req.params.id);

  if (!cars) {
    res.render("deletar", {
      cars, msg: "Veículo não encontrado!",
    });
  }

  await cars.destroy();

  msg = `${cars.modelo} deletado com sucesso!`

  res.redirect("/");
});

app.get("/sobre", (req, res) => {
  res.render('sobre')
});



app.listen(port, () => console.log(`Servidor operando em http://localhost:${port}`))