const Area_Interesse = require("../database/collections/area_interesse.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const checkToken = require("./verifyToken.js");
let router = express.Router();

//#region POST
router.post("/", function(request, response)
{
    const data =
    {
        area: request.body.area,
        global: false
    };

    Area_Interesse.insert(data, function(result)
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
        area: request.body.area,
        global: request.body.global
    };

    Area_Interesse.update(data, function(result)
    {
        response.json(result);
    });
});

router.post("/put/:id", function(request, response)
{
    const data =
    {
        _id: request.params.id,
        area: request.body.area,
        global: request.body.global
    };

    Area_Interesse.update(data, function(result)
    {
        response.json(result);
    });
});
//#endregion

//#region GET

//#region ALL
router.get("/", function(request, response)
{
    Area_Interesse.findAll(function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region ID
router.get("/id", function(request, response)
{
    Area_Interesse.find("_id", request.body._id, true, function(results)
    {
        response.send(results);
    });
});

router.get("/id/:id", function(request, response)
{
    Area_Interesse.find("_id", request.params.id, true, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region AREA
router.get("/area", function(request, response)
{
    Area_Interesse.find("area", request.body.area, true, function(results)
    {
        response.send(results);
    });
});

router.get("/area/:area", function(request, response)
{
    Area_Interesse.find("area", request.params.area, true, function(results)
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
        Area_Interesse.find("global", true, false, function(results)
        {
            response.send(results);
        });
    }
    else
    {
        Area_Interesse.find("global", false, false, function(results)
        {
            response.send(results);
        });
    }
});

router.get("/global/:global", function(request, response)
{
    if (request.params.global === "true" || request.params.global === true)
    {
        Area_Interesse.find("global", true, false, function(results)
        {
            response.send(results);
        });
    }
    else
    {
        Area_Interesse.find("global", false, false, function(results)
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
    Area_Interesse.remove(request.params.id, function(result)
    {
        response.send(result);
    });
});

router.delete("/", function (request, response)
{
    Area_Interesse.remove(request.body._id, function(result)
    {
        response.send(result);
    });
});
//#endregion

module.exports = router;
