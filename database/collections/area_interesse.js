const Area_Interesse = require("../models/area_interesse.js");

function insert(data, callback)
{
    const obj = {};

    if (typeof data.area !== "undefined") 
    obj["area"] = data.area;
    if (typeof data.global !== "undefined") 
    obj["global"] = data.global;

    callback(insertObj(obj));
}

function insertObj(obj)
{
    let area_interesse = new Area_Interesse(obj);

    area_interesse.save(function (error)
    {
        if (error) return console.error(error);
        console.log("INSERT Area_Interesse:", obj);
    });

    return area_interesse;
}

function update(data, callback)
{
    const filter = { _id: data._id };
    const dataToUpdate = {};

    if (typeof data.area !== "undefined") 
    dataToUpdate["area"] = data.area;
    if (typeof data.global !== "undefined") 
    dataToUpdate["global"] = data.global;

    Area_Interesse.findOneAndUpdate(filter, { $set: dataToUpdate }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function remove(id, callback)
{
    Area_Interesse.findOneAndDelete({_id: id }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function findAll(callback)
{
    Area_Interesse.find({}).exec(function(error, results)
    {
        if (error) return console.error(error);
        callback(results);
    });
}

function find(column, value, one, callback)
{
    let search = {};
    search[column] = value;

    if (one)
    {
        Area_Interesse.findOne(search).exec(function(error, result)
        {
            if (error) return console.error(error);
            callback(result);
        });
    }
    else
    {
        Area_Interesse.find(search).exec(function(error, results)
        {
            if (error) return console.error(error);
            callback(results);
        });
    }  
}

function model()
{
    return Area_Interesse;
}

function insertStartingData()
{
    const areas_interesse = 
    [
        "Atividades Académicas (por ex. apoio às matrículas…)",
        "Ambiental (por ex. ações de sensibilização, de limpeza…)",
        "Apoio a Eventos",
        "Informática (por ex. criação de sites, de bases de dados, formação…)",
        "Comunicação (por ex. divulgação nas Escolas Secundárias/Profissionais, Futurália…)",
        "Cultural (por ex. teatro; música...)",
        "Desporto (por ex. apoio a eventos desportivos, caminhadas…)",
        "Educação (por ex. estudo acompanhado, alfabetização…)",
        "Saúde (por ex. rastreios, ações de sensibilização…)",
        "Social (por ex. apoio a idosos, a crianças, Banco Alimentar…)"
    ];
    areas_interesse.forEach(area_interesse => insert(area_interesse, true));
}

module.exports.insert = insert;
module.exports.insertObj = insertObj;
module.exports.update = update;
module.exports.remove = remove;
module.exports.findAll = findAll;
module.exports.find = find;
module.exports.model = model;
module.exports.insertStartingData = insertStartingData;