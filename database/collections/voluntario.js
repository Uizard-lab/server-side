const Voluntario = require("../models/voluntario.js");

function insert(data, callback)
{
    const obj = {};

    if (typeof data.nome_completo !== "undefined") 
    obj["nome_completo"] = data.nome_completo;
    if (typeof data.email !== "undefined") 
    obj["email"] = data.email;
    if (typeof data.password !== "undefined") 
    obj["password"] = data.password;
    if (typeof data.telemovel !== "undefined") 
    obj["telemovel"] = data.telemovel;
    if (typeof data.concelho !== "undefined") 
    obj["concelho"] = data.concelho;
    if (typeof data.data_nascimento !== "undefined") 
    obj["data_nascimento"] = data.data_nascimento;
    if (typeof data.tipo_membro !== "undefined") 
    obj["tipo_membro"] = data.tipo_membro;
    if (typeof data.escola_servico !== "undefined") 
    obj["escola_servico"] = data.escola_servico;
    if (typeof data.curso_formacao !== "undefined") 
    obj["curso_formacao"] = data.curso_formacao;
    if (typeof data.areas_interesse !== "undefined") 
    obj["areas_interesse"] = data.areas_interesse;
    if (typeof data.razoes_voluntario !== "undefined") 
    obj["razoes_voluntario"] = data.razoes_voluntario;
    if (typeof data.observacoes !== "undefined") 
    obj["observacoes"] = data.observacoes;
    if (typeof data.aprovado !== "undefined") 
    obj["aprovado"] = data.aprovado;
    if (typeof data.data_criacao !== "undefined") 
    obj["data_criacao"] = data.data_criacao;

    callback(insertObj(obj));
}

function insertObj(obj)
{
    let voluntario = new Voluntario(obj);

    voluntario.save(function (error)
    {
        if (error) return console.error(error);
        console.log("INSERT Voluntario:", obj);
    });

    return voluntario;
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
    if (typeof data.telemovel !== "undefined") 
    dataToUpdate["telemovel"] = data.telemovel;
    if (typeof data.concelho !== "undefined") 
    dataToUpdate["concelho"] = data.concelho;
    if (typeof data.data_nascimento !== "undefined") 
    dataToUpdate["data_nascimento"] = data.data_nascimento;
    if (typeof data.tipo_membro !== "undefined") 
    dataToUpdate["tipo_membro"] = data.tipo_membro;
    if (typeof data.escola_servico !== "undefined") 
    dataToUpdate["escola_servico"] = data.escola_servico;
    if (typeof data.curso_formacao !== "undefined") 
    dataToUpdate["curso_formacao"] = data.curso_formacao;
    if (typeof data.areas_interesse !== "undefined") 
    dataToUpdate["areas_interesse"] = data.areas_interesse;
    if (typeof data.razoes_voluntario !== "undefined") 
    dataToUpdate["razoes_voluntario"] = data.razoes_voluntario;
    if (typeof data.observacoes !== "undefined") 
    dataToUpdate["observacoes"] = data.observacoes;
    if (typeof data.aprovado !== "undefined") 
    dataToUpdate["aprovado"] = data.aprovado;
    if (typeof data.data_criacao !== "undefined") 
    dataToUpdate["data_criacao"] = data.data_criacao;

    Voluntario.findOneAndUpdate(filter, { $set: dataToUpdate }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function remove(id, callback)
{
    Voluntario.findOneAndDelete({_id: id }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function findAll(callback)
{
    Voluntario.find({})
    .populate("concelho")
    .populate("tipo_membro")
    .populate({path: "areas_interesse", model: "Area_Interesse"})
    .populate({path: "razoes_voluntario", model: "Razao_Voluntario"})
    .exec(function(error, results)
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
        Voluntario.findOne(search)
        .populate("concelho")
        .populate("tipo_membro")
        .populate({path: "areas_interesse", model: "Area_Interesse"})
        .populate({path: "razoes_voluntario", model: "Razao_Voluntario"})
        .exec(function(error, result)
        {
            if (error) return console.error(error);
            callback(result);
        });
    }
    else
    {
        Voluntario.find(search)
        .populate("concelho")
        .populate("tipo_membro")
        .populate({path: "areas_interesse", model: "Area_Interesse"})
        .populate({path: "razoes_voluntario", model: "Razao_Voluntario"})
        .exec(function(error, results)
        {
            if (error) return console.error(error);
            callback(results);
        });
    }  
}

function model()
{
    return Voluntario;
}

module.exports.insert = insert;
module.exports.insertObj = insertObj;
module.exports.update = update;
module.exports.remove = remove;
module.exports.findAll = findAll;
module.exports.find = find;
module.exports.model = model;