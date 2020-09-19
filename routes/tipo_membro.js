const Tipo_Membro = require("../database/collections/tipo_membro.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const checkToken = require("./verifyToken.js");
let router = express.Router();

//#region POST
router.post("/", function(request, response)
{
    const data =
    {
        tipo: request.body.tipo
    };

    Tipo_Membro.insert(data, function(result)
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
        tipo: request.body.tipo
    };

    Tipo_Membro.update(data, function(result)
    {
        response.json(result);
    });
});

router.post("/put/:id", function(request, response)
{
    const data =
    {
        _id: request.params.id,
        tipo: request.body.tipo
    };

    Tipo_Membro.update(data, function(result)
    {
        response.json(result);
    });
});
//#endregion

//#region GET

//#region ALL
router.get("/", function(request, response)
{
    Tipo_Membro.findAll(function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region ID
router.get("/id", function(request, response)
{
    Tipo_Membro.find("_id", request.body._id, true, function(results)
    {
        response.send(results);
    });
});

router.get("/id/:id", function(request, response)
{
    Tipo_Membro.find("_id", request.params.id, true, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region TIPO
router.get("/tipo", function(request, response)
{
    Tipo_Membro.find("tipo", request.body.tipo, true, function(results)
    {
        response.send(results);
    });
});

router.get("/tipo/:tipo", function(request, response)
{
    Tipo_Membro.find("tipo", request.params.tipo, true, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#endregion

//#region DELETE
router.delete("/:id", function (request, response)
{
    Tipo_Membro.remove(request.params.id, function(result)
    {
        response.send(result);
    });
});

router.delete("/", function (request, response)
{
    Tipo_Membro.remove(request.body._id, function(result)
    {
        response.send(result);
    });
});
//#endregion

module.exports = router;