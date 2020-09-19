const Tipo_Membro = require("../models/tipo_membro.js");

function insert(data, callback)
{
    const obj = {};

    if (typeof data.tipo !== "undefined") 
    obj["tipo"] = data.tipo;

    callback(insertObj(obj));
}

function insertObj(obj)
{
    let tipo_membro = new Tipo_Membro(obj);

    tipo_membro.save(function (error)
    {
        if (error) return console.error(error);
        console.log("INSERT Tipo_Membro:", obj);
    });

    return tipo_membro;
}

function update(data, callback)
{
    const filter = { _id: data._id };
    const dataToUpdate = {};

    if (typeof data.tipo !== "undefined") 
    dataToUpdate["tipo"] = data.tipo;

    Tipo_Membro.findOneAndUpdate(filter, { $set: dataToUpdate }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function remove(id, callback)
{
    Tipo_Membro.findOneAndDelete({_id: id }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function findAll(callback)
{
    Tipo_Membro.find({}).exec(function(error, results)
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
        Tipo_Membro.findOne(search).exec(function(error, result)
        {
            if (error) return console.error(error);
            callback(result);
        });
    }
    else
    {
        Tipo_Membro.find(search).exec(function(error, results)
        {
            if (error) return console.error(error);
            callback(results);
        });
    }  
}

function model()
{
    return Tipo_Membro;
}

function insertStartingData()
{
    const tipos_membro = 
    [
        "Estudante",
        "Diplomado",
        "Docente",
        "Não Docente",
        "Bolseiro",
        "Aposentado"
    ];
    tipos_membro.forEach(tipo_membro => insert(tipo_membro));
}

module.exports.insert = insert;
module.exports.insertObj = insertObj;
module.exports.update = update;
module.exports.remove = remove;
module.exports.findAll = findAll;
module.exports.find = find;
module.exports.model = model;
module.exports.insertStartingData = insertStartingData;