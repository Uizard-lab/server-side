const Voluntario = require("../database/collections/voluntario.js");
const Gestor = require("../database/collections/gestor.js");
const Comissao = require("../database/collections/comissao.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const checkToken = require("./verifyToken.js");
const { response } = require("express");
let router = express.Router();

//#region FRONT OFFICE
router.get("/logged", function (request, response) {
  const header = request.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    const decoded = jwt.decode(token).result;

    if (decoded.concelho) response.json({ type: "Voluntario", user: decoded });
    else if (decoded.nome_organizacao)
      response.json({ type: "Gestor", user: decoded });
    else response.json({ type: "Comissao", user: decoded });
  } else response.json("No Token found!");
});

router.get("/id/:token", function (request, response) {
  response.json(jwt.decode(request.params.token).result._id);
});
router.get("/:token", function (request, response) {
  response.json(jwt.decode(request.params.token).result._id);
});

router.post("/frontoffice", function (request, response) {
  Voluntario.model()
    .findOne({ email: request.body.email, password: request.body.password })
    .exec(function (errorVoluntario, resultVoluntario) {
      if (errorVoluntario) console.log(errorVoluntario);

      if (resultVoluntario) {
        const result = resultVoluntario;
        const token = jwt.sign({ result }, "secret-key", {
          expiresIn: 300,
        });

        return response.json({
          auth: true,
          token: token,
          type: "Voluntario",
          msg: "Login com sucesso para Voluntário!",
        });
      } else {
        Gestor.model()
          .findOne({
            email: request.body.email,
            password: request.body.password,
          })
          .exec(function (errorGestor, resultGestor) {
            if (errorGestor) console.log(errorGestor);

            if (resultGestor) {
              const result = resultGestor;
              const token = jwt.sign({ result }, "secret-key", {
                expiresIn: 300,
              });

              return response.json({
                auth: true,
                token: token,
                type: "Gestor",
                msg: "Login com sucesso para Gestor!",
              });
            } else {
              Comissao.model()
                .findOne({
                  email: request.body.email,
                  password: request.body.password,
                })
                .exec(function (errorComissao, resultComissao) {
                  if (errorComissao) console.log(errorComissao);

                  if (resultComissao) {
                    const result = resultComissao;
                    const token = jwt.sign({ result }, "secret-key", {
                      expiresIn: 300,
                    });

                    return response.json({
                      auth: true,
                      token: token,
                      type: "Comissao",
                      msg: "Login com sucesso para Comissao!",
                    });
                  } else {
                    return response.json({
                      auth: false,
                      token: null,
                      type: "None",
                      msg: "Login sem sucesso, dados inválidos!",
                    });
                  }
                });
            }
          });
      }
    });
});

router.post("/frontoffice/:email/:password", function (request, response) {
  Voluntario.model()
    .findOne({ email: request.params.email, password: request.params.password })
    .exec(function (errorVoluntario, resultVoluntario) {
      if (errorVoluntario) console.log(errorVoluntario);

      if (resultVoluntario) {
        const result = resultVoluntario;
        const token = jwt.sign({ result }, "secret-key", {
          expiresIn: 300,
        });

        return response.json({
          auth: true,
          token: token,
          type: "Voluntario",
          msg: "Login com sucesso para Voluntário!",
        });
      } else {
        Gestor.model()
          .findOne({
            email: request.params.email,
            password: request.params.password,
          })
          .exec(function (errorGestor, resultGestor) {
            if (errorGestor) console.log(errorGestor);

            if (resultGestor) {
              const result = resultGestor;
              const token = jwt.sign({ result }, "secret-key", {
                expiresIn: 300,
              });

              return response.json({
                auth: true,
                token: token,
                type: "Gestor",
                msg: "Login com sucesso para Gestor!",
              });
            } else {
              Comissao.model()
                .findOne({
                  email: request.params.email,
                  password: request.params.password,
                })
                .exec(function (errorComissao, resultComissao) {
                  if (errorComissao) console.log(errorComissao);

                  if (resultComissao) {
                    const result = resultComissao;
                    const token = jwt.sign({ result }, "secret-key", {
                      expiresIn: 300,
                    });

                    return response.json({
                      auth: true,
                      token: token,
                      type: "Comissao",
                      msg: "Login com sucesso para Comissao!",
                    });
                  } else {
                    return response.json({
                      auth: false,
                      token: null,
                      type: "None",
                      msg: "Login sem sucesso, dados inválidos!",
                    });
                  }
                });
            }
          });
      }
    });
});
//#endregion

//#region BACK OFFICE
router.post("/backoffice", function (request, response) {
  Comissao.model()
    .findOne({ email: request.body.email, password: request.body.password })
    .exec(function (error, result) {
      if (error) console.log(error);

      if (result) {
        const token = jwt.sign({ result }, "secret-key", {
          expiresIn: 300,
        });

        return response.json({
          auth: true,
          token: token,
          type: "Comissao",
          msg: "Login com sucesso para Comissao!",
        });
      } else {
        return response.json({
          auth: false,
          token: null,
          msg: "Login sem sucesso, dados inválidos!",
        });
      }
    });
});

router.post("/backoffice/:email/:password", function (request, response) {
  Comissao.model()
    .findOne({ email: request.params.email, password: request.params.password })
    .exec(function (error, result) {
      if (error) console.log(error);

      if (result) {
        const token = jwt.sign({ result }, "secret-key", {
          expiresIn: 300,
        });

        return response.json({
          auth: true,
          token: token,
          type: "Comissao",
          msg: "Login com sucesso para Comissao!",
        });
      } else {
        return response.json({
          auth: false,
          token: null,
          msg: "Login sem sucesso, dados inválidos!",
        });
      }
    });
});
//#endregion

//#region LOGOUT
router.post("/logout", function (request, response) {
  return response.json({
    auth: false,
    token: null,
    type: "None",
    msg: "Logout com sucesso!",
  });
});
//#endregion

module.exports = router;
