const Razao_Voluntario = require("../models/razao_voluntario.js");

function insert(data, callback)
{
    const obj = {};

    if (typeof data.razao !== "undefined") 
    obj["razao"] = data.razao;
    if (typeof data.global !== "undefined") 
    obj["global"] = data.global;

    callback(insertObj(obj));
}

function insertObj(obj)
{
    let razao_voluntario = new Razao_Voluntario(obj);

    razao_voluntario.save(function (error)
    {
        if (error) return console.error(error);
        console.log("INSERT Razao_Voluntario:", obj);
    });

    return razao_voluntario;
}

function update(data, callback)
{
    const filter = { _id: data._id };
    const dataToUpdate = {};

    if (typeof data.razao !== "undefined") 
    dataToUpdate["razao"] = data.razao;
    if (typeof data.global !== "undefined") 
    dataToUpdate["global"] = data.global;

    Razao_Voluntario.findOneAndUpdate(filter, { $set: dataToUpdate }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function remove(id, callback)
{
    Razao_Voluntario.findOneAndDelete({_id: id }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function findAll(callback)
{
    Razao_Voluntario.find({}).exec(function(error, results)
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
        Razao_Voluntario.findOne(search).exec(function(error, result)
        {
            if (error) return console.error(error);
            callback(result);
        });
    }
    else
    {
        Razao_Voluntario.find(search).exec(function(error, results)
        {
            if (error) return console.error(error);
            callback(results);
        });
    }  
}

function model()
{
    return Razao_Voluntario;
}

function insertStartingData()
{
    const razoes_voluntario = 
    [
        "Pelo convívio social",
        "Porque pode ser vantajoso para o futuro profissional",
        "Pela possibilidade de integração social",
        "Para ter novas experiências",
        "Porque gosto de ajudar os outros",
        "Porque fui incentivado(a) por outras pessoas",
        "Porque conheço pessoas que já realizaram atividades de voluntariado no IPS",
        "Para me sentir útil",
        "Para ocupar tempo livre"
    ];
    razoes_voluntario.forEach(razao_voluntario => insert(razao_voluntario, true));
}

module.exports.insert = insert;
module.exports.insertObj = insertObj;
module.exports.update = update;
module.exports.remove = remove;
module.exports.findAll = findAll;
module.exports.find = find;
module.exports.model = model;
module.exports.insertStartingData = insertStartingData;