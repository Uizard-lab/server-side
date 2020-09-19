const Gestor = require("../database/collections/gestor.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const checkToken = require("./verifyToken.js");
const emailer = require("./emailer.js");
let router = express.Router();

//#region POST
router.post("/", function (request, response) {
  const data = {
    nome_organizacao: request.body.nome_organizacao,
    email: request.body.email,
    password: request.body.password,
    aprovado: request.body.aprovado,
    data_criacao: request.body.data_criacao,
  };

  Gestor.insert(data, function (result) {
    emailer.candidaturaGestor(data.email, data.nome_organizacao);
    response.json(result);
  });
});
//#endregion

//#region PUT
router.post("/put", function (request, response) {
  const header = request.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    const decoded = jwt.decode(token).result;

    const data = {
      _id: decoded._id,
      nome_organizacao: request.body.nome_organizacao,
      email: request.body.email,
      password: request.body.password,
      aprovado: request.body.aprovado,
      data_criacao: request.body.data_criacao,
    };

    Gestor.update(data, function (result) {
      response.json(result);
    });
  } else response.json("No Token found!");
});

router.post("/put/:id", function (request, response) {
  console.log(request.body);
  const header = request.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    const decoded = jwt.decode(token).result;

    const data = {
      _id: request.params.id,
      nome_organizacao: request.body.nome_organizacao,
      email: request.body.email,
      password: request.body.password,
      aprovado: request.body.aprovado,
      data_criacao: request.body.data_criacao,
    };

    Gestor.update(data, function (result) {
      response.json(result);
    });
  } else response.json("No Token found!");
});

router.post("/aprovar", function (request, response) {
  const header = request.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    const decoded = jwt.decode(token).result;

    const data = {
      _id: request.body._id,
      aprovado: true,
    };

    Gestor.update(data, function (result) {
      Gestor.find("_id", data._id, true, function (gestor) {
        emailer.candidaturaGestorAprovado(gestor.email, gestor.nome_organizacao);
      });
      response.json(result);
    });
  } else response.json("No Token found!");
});

router.post("/aprovar/:id", function (request, response) {
  const header = request.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    const decoded = jwt.decode(token).result;

    const data = {
      _id: request.params.id,
      aprovado: true,
    };

    Gestor.update(data, function (result) {
      Gestor.find("_id", data._id, true, function (gestor) {
        emailer.candidaturaGestorAprovado(gestor.email, gestor.nome_organizacao);
      });
      response.json(result);
    });
  } else response.json("No Token found!");
});
//#endregion

//#region GET

//#region ALL
router.get("/", function (request, response) {
  Gestor.findAll(function (results) {
    response.send(results);
  });
});
//#endregion

//#region POR APROVAR
router.get("/poraprovar", function (request, response) {
  Gestor.find("aprovado", false, false, function (results) {
    response.send(results);
  });
});
//#endregion

//#endregion

//#region DELETE
router.delete("/:id", function (request, response) {
  Gestor.remove(request.params.id, function (result) {
    response.send(result);
  });
});

router.delete("/", function (request, response) {
  Gestor.remove(request.body._id, function (result) {
    response.send(result);
  });
});
//#endregion

module.exports = router;
