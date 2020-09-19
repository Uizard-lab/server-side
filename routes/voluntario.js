const Voluntario = require("../database/collections/voluntario.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const checkToken = require("./verifyToken.js");
const emailer = require("./emailer.js");
let router = express.Router();

//#region POST
router.post("/", function (request, response) {
  const data = {
    nome_completo: request.body.nome_completo,
    email: request.body.email,
    password: request.body.password,
    telemovel: request.body.telemovel,
    concelho: request.body.concelho,
    data_nascimento: request.body.data_nascimento,
    tipo_membro: request.body.tipo_membro,
    escola_servico: request.body.escola_servico,
    curso_formacao: request.body.curso_formacao,
    areas_interesse: request.body.areas_interesse,
    razoes_voluntario: request.body.razoes_voluntario,
    observacoes: request.body.observacoes,
    aprovado: request.body.aprovado,
    data_criacao: request.body.data_criacao,
  };
  Voluntario.insert(data, function (result) {
    emailer.candidaturaVoluntario(data.email, data.nome_completo);
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
      nome_completo: request.body.nome_completo,
      email: request.body.email,
      password: request.body.password,
      telemovel: request.body.telemovel,
      concelho: request.body.concelho,
      data_nascimento: request.body.data_nascimento,
      tipo_membro: request.body.tipo_membro,
      escola_servico: request.body.escola_servico,
      curso_formacao: request.body.curso_formacao,
      areas_interesse: request.body.areas_interesse,
      razoes_voluntario: request.body.razoes_voluntario,
      observacoes: request.body.observacoes,
      aprovado: request.body.aprovado,
      data_criacao: request.body.data_criacao,
    };

    Voluntario.update(data, function (result) {
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
      _id: request.body._id,
      nome_completo: request.body.nome_completo,
      email: request.body.email,
      password: request.body.password,
      telemovel: request.body.telemovel,
      concelho: request.body.concelho,
      data_nascimento: request.body.data_nascimento,
      tipo_membro: request.body.tipo_membro,
      escola_servico: request.body.escola_servico,
      curso_formacao: request.body.curso_formacao,
      areas_interesse: request.body.areas_interesse,
      razoes_voluntario: request.body.razoes_voluntario,
      observacoes: request.body.observacoes,
      aprovado: request.body.aprovado,
      data_criacao: request.body.data_criacao,
    };

    Voluntario.update(data, function (result) {
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

    Voluntario.update(data, function (result) {
      Voluntario.find("_id", data._id, true, function (voluntario) {
        emailer.candidaturaVoluntarioAprovado(voluntario.email, voluntario.nome_completo);
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

    Voluntario.update(data, function (result) {
      Voluntario.find("_id", data._id, true, function (voluntario) {
        emailer.candidaturaVoluntarioAprovado(voluntario.email, voluntario.nome_completo);
      });
      response.json(result);
    });
  } else response.json("No Token found!");
});
//#endregion

//#region GET

//#region ALL
router.get("/", function (request, response) {
  Voluntario.findAll(function (results) {
    response.send(results);
  });
});
//#endregion

//#region POR APROVAR
router.get("/poraprovar", function (request, response) {
  Voluntario.find("aprovado", false, false, function (results) {
    response.send(results);
  });
});
//#endregion

//#endregion

//#region DELETE
router.delete("/:id", function (request, response) {
  Voluntario.remove(request.params.id, function (result) {
    response.send(result);
  });
});

router.delete("/", function (request, response) {
  Voluntario.remove(request.body._id, function (result) {
    response.send(result);
  });
});
//#endregion

module.exports = router;
