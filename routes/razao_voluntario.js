const Razao_Voluntario = require("../database/collections/razao_voluntario.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const checkToken = require("./verifyToken.js");
let router = express.Router();

router.get("/", function(request, response)
{
    Razao_Voluntario.findAll(function(results)
    {
        response.send(results);
    });
});

router.post("/", function(request, response)
{
    const razao_voluntario = Razao_Voluntario.insert(request.body.razao, false);
    response.json(razao_voluntario);
});


//#region POST
router.post("/", function(request, response)
{
    const data =
    {
        razao: request.body.razao,
        global: false
    };

    Razao_Voluntario.insert(data, function(result)
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
        razao: request.body.razao,
        global: request.body.global
    };

    Razao_Voluntario.update(data, function(result)
    {
        response.json(result);
    });
});

router.post("/put/:id", function(request, response)
{
    const data =
    {
        _id: request.params.id,
        razao: request.body.razao,
        global: request.body.global
    };

    Razao_Voluntario.update(data, function(result)
    {
        response.json(result);
    });
});
//#endregion

//#region GET

//#region ALL
router.get("/", function(request, response)
{
    Razao_Voluntario.findAll(function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region ID
router.get("/id", function(request, response)
{
    Razao_Voluntario.find("_id", request.body._id, true, function(results)
    {
        response.send(results);
    });
});

router.get("/id/:id", function(request, response)
{
    Razao_Voluntario.find("_id", request.params.id, true, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region RAZAO
router.get("/razao", function(request, response)
{
    Razao_Voluntario.find("razao", request.body.razao, true, function(results)
    {
        response.send(results);
    });
});

router.get("/razao/:razao", function(request, response)
{
    Razao_Voluntario.find("razao", request.params.razao, true, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region GLOBAL
router.get("/global", function(request, response)
{
    if (request.body.global === "true" || request.body.global === true)
    {
        Razao_Voluntario.find("global", true, false, function(results)
        {
            response.send(results);
        });
    }
    else
    {
        Razao_Voluntario.find("global", false, false, function(results)
        {
            response.send(results);
        });
    }
});

router.get("/global/:global", function(request, response)
{
    if (request.params.global === "true" || request.params.global === true)
    {
        Razao_Voluntario.find("global", true, false, function(results)
        {
            response.send(results);
        });
    }
    else
    {
        Razao_Voluntario.find("global", false, false, function(results)
        {
            response.send(results);
        });
    }
});
//#endregion

//#endregion

//#region DELETE
router.delete("/:id", function (request, response)
{
    Razao_Voluntario.remove(request.params.id, function(result)
    {
        response.send(result);
    });
});

router.delete("/", function (request, response)
{
    Razao_Voluntario.remove(request.body._id, function(result)
    {
        response.send(result);
    });
});
//#endregion

module.exports = router;