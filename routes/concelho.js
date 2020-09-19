const Concelho = require("../database/collections/concelho.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const checkToken = require("./verifyToken.js");
let router = express.Router();

//#region POST
router.post("/", function(request, response)
{
    const data =
    {
        nome: request.body.nome
    };

    Concelho.insert(data, function(result)
    {
        response.json(result);
    });
});
//#endregion

//#region PUT
router.post("/put", function(request, response)
{
    const data =
    {
        _id: request.body._id,
        nome: request.body.nome
    };

    Concelho.update(data, function(result)
    {
        response.json(result);
    });
});

router.post("/put/:id", function(request, response)
{
    const data =
    {
        _id: request.params.id,
        nome: request.body.nome
    };

    Concelho.update(data, function(result)
    {
        response.json(result);
    });
});
//#endregion

//#region GET

//#region ALL
router.get("/", function(request, response)
{
    Concelho.findAll(function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region ID
router.get("/id", function(request, response)
{
    Concelho.find("_id", request.body._id, true, function(results)
    {
        response.send(results);
    });
});

router.get("/id/:id", function(request, response)
{
    Concelho.find("_id", request.params.id, true, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region NOME
router.get("/nome", function(request, response)
{
    Concelho.find("nome", request.body.nome, true, function(results)
    {
        response.send(results);
    });
});

router.get("/nome/:nome", function(request, response)
{
    Concelho.find("nome", request.params.nome, true, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#endregion

//#region DELETE
router.delete("/:id", function (request, response)
{
    Concelho.remove(request.params.id, function(result)
    {
        response.send(result);
    });
});

router.delete("/", function (request, response)
{
    Concelho.remove(request.body._id, function(result)
    {
        response.send(result);
    });
});
//#endregion

module.exports = router;