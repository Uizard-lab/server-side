const Comissao = require("../models/comissao.js");

function insert(data, callback)
{
    const obj = {};

    if (typeof data.nome_completo !== "undefined") 
    obj["nome_completo"] = data.nome_completo;
    if (typeof data.email !== "undefined") 
    obj["email"] = data.email;
    if (typeof data.password !== "undefined") 
    obj["password"] = data.password;
    if (typeof data.aprovado !== "undefined") 
    obj["aprovado"] = data.aprovado;
    if (typeof data.data_criacao !== "undefined") 
    obj["data_criacao"] = data.data_criacao;

    callback(insertObj(obj));
}

function insertObj(obj)
{
    let comissao = new Comissao(obj);

    comissao.save(function (error)
    {
        if (error) return console.error(error);
        console.log("INSERT Comissao:", obj);    
    });

    return comissao;
}

function update(data, callback)
{
    const filter = { _id: data._id };
    const dataToUpdate = {};

    if (typeof data.nome_completo !== "undefined") 
    dataToUpdate["nome_completo"] = data.nome_completo;
    if (typeof data.email !== "undefined") 
    dataToUpdate["email"] = data.email;
    if (typeof data.password !== "undefined") 
    dataToUpdate["password"] = data.password;
    if (typeof data.aprovado !== "undefined") 
    dataToUpdate["aprovado"] = data.aprovado;
    if (typeof data.data_criacao !== "undefined") 
    dataToUpdate["data_criacao"] = data.data_criacao;

    Comissao.findOneAndUpdate(filter, { $set: dataToUpdate }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function remove(id, callback)
{
    Comissao.findOneAndDelete({_id: id }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function findAll(callback)
{
    Comissao.find({}).exec(function(error, results)
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
        Comissao.findOne(search).exec(function(error, result)
        {
            if (error) return console.error(error);
            callback(result);
        });
    }
    else
    {
        Comissao.find(search).exec(function(error, results)
        {
            if (error) return console.error(error);
            callback(results);
        });
    }  
}

function model()
{
    return Comissao;
}

module.exports.insert = insert;
module.exports.insertObj = insertObj;
module.exports.update = update;
module.exports.remove = remove;
module.exports.findAll = findAll;
module.exports.find = find;
module.exports.model = model;