const Comissao = require("../database/collections/comissao.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const checkToken = require("./verifyToken.js");
let router = express.Router();

//#region POST
router.post("/", function(request, response)
{
    const data =
    {
        nome_completo: request.body.nome_completo,
        email: request.body.email,
        password: request.body.password,
        aprovado: request.body.aprovado,
        data_criacao: request.body.data_criacao
    };

    Comissao.insert(data, function(result)
    {
        response.json(result);
    });
});
//#endregion

//#region PUT
router.post("/put", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        const data =
        {
            _id: decoded._id,
            nome_completo: request.body.nome_completo,
            email: request.body.email,
            password: request.body.password,
            aprovado: request.body.aprovado,
            data_criacao: request.body.data_criacao
        };

        Comissao.update(data, function(result)
        {
            response.json(result);
        });
    }
    else response.json("No Token found!");
});

router.post("/aprovar", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        const data =
        {
            _id: request.body._id,
            aprovado: true
        };

        Comissao.update(data, function(result)
        {
            response.json(result);
        });
    }
    else response.json("No Token found!");
});

router.post("/aprovar/:id", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        const data =
        {
            _id: request.params.id,
            aprovado: true
        };

        Comissao.update(data, function(result)
        {
            response.json(result);
        });
    }
    else response.json("No Token found!");
});
//#endregion

//#region GET

//#region ALL
router.get("/", function(request, response)
{
    Comissao.findAll(function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region POR APROVAR
router.get("/poraprovar", function(request, response)
{
    Comissao.find("aprovado", false, false, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#endregion

//#region DELETE
router.delete("/:id", function (request, response)
{
    Comissao.remove(request.params.id, function(result)
    {
        response.send(result);
    });
});

router.delete("/", function (request, response)
{
    Comissao.remove(request.body._id, function(result)
    {
        response.send(result);
    });
});
//#endregion

module.exports = router;