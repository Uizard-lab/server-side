const Atividade_Interna = require("../models/atividade_interna.js");

function insert(data, callback)
{
    const obj = {};

    if (typeof data.projeto_interno !== "undefined") 
    obj["projeto_interno"] = data.projeto_interno;
    if (typeof data.nome !== "undefined") 
    obj["nome"] = data.nome;
    if (typeof data.objetivo !== "undefined") 
    obj["objetivo"] = data.objetivo;
    if (typeof data.descricao !== "undefined") 
    obj["descricao"] = data.descricao;
    if (typeof data.data_atividade !== "undefined") 
    obj["data_atividade"] = data.data_atividade;
    if (typeof data.horario !== "undefined") 
    obj["horario"] = data.horario;
    if (typeof data.observacoes !== "undefined") 
    obj["observacoes"] = data.observacoes;
    if (typeof data.candidatos !== "undefined") 
    obj["candidatos"] = data.candidatos;
    if (typeof data.participantes !== "undefined") 
    obj["participantes"] = data.participantes;
    if (typeof data.concluido !== "undefined") 
    obj["concluido"] = data.concluido;
    if (typeof data.aprovado !== "undefined") 
    obj["aprovado"] = data.aprovado;
    if (typeof data.data_criacao !== "undefined") 
    obj["data_criacao"] = data.data_criacao;

    callback(insertObj(obj));
}

function insertObj(obj)
{
    let atividade_interna = new Atividade_Interna(obj);

    atividade_interna.save(function (error)
    {
        if (error) return console.error(error);
        console.log("INSERT Atividade_Interna:", obj);
    });

    return atividade_interna;
}

function update(data, callback)
{
    const filter = { _id: data._id };
    const dataToUpdate = {};

    if (typeof data.projeto_interno !== "undefined") 
    dataToUpdate["projeto_interno"] = data.projeto_interno;
    if (typeof data.nome !== "undefined") 
    dataToUpdate["nome"] = data.nome;
    if (typeof data.objetivo !== "undefined") 
    dataToUpdate["objetivo"] = data.objetivo;
    if (typeof data.descricao !== "undefined") 
    dataToUpdate["descricao"] = data.descricao;
    if (typeof data.data_atividade !== "undefined") 
    dataToUpdate["data_atividade"] = data.data_atividade;
    if (typeof data.horario !== "undefined") 
    dataToUpdate["horario"] = data.horario;
    if (typeof data.observacoes !== "undefined") 
    dataToUpdate["observacoes"] = data.observacoes;
    if (typeof data.candidatos !== "undefined") 
    dataToUpdate["candidatos"] = data.candidatos;
    if (typeof data.participantes !== "undefined") 
    dataToUpdate["participantes"] = data.participantes;
    if (typeof data.concluido !== "undefined") 
    dataToUpdate["concluido"] = data.concluido;
    if (typeof data.aprovado !== "undefined") 
    dataToUpdate["aprovado"] = data.aprovado;
    if (typeof data.data_criacao !== "undefined") 
    dataToUpdate["data_criacao"] = data.data_criacao;

    Atividade_Interna.findOneAndUpdate(filter, { $set: dataToUpdate }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function remove(id, callback)
{
    Atividade_Interna.findOneAndDelete({_id: id }, function(error, result)
    {
        if (error) console.log(error);
        else callback(result);
    });
}

function findAll(callback)
{
    Atividade_Interna.find({})
    .populate("projeto_interno")
    .populate({path: "candidatos", model: "Voluntario", populate: {path: "concelho", path: "tipo_membro", path: "area_interesse", path: "razoes_voluntario"}})
    .populate({path: "participantes", model: "Voluntario", populate: {path: "concelho", path: "tipo_membro", path: "area_interesse", path: "razoes_voluntario"}})
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
        Atividade_Interna.findOne(search)
        .populate("projeto_interno")
        .populate({path: "candidatos", model: "Voluntario", populate: {path: "concelho", path: "tipo_membro", path: "area_interesse", path: "razoes_voluntario"}})
        .populate({path: "participantes", model: "Voluntario", populate: {path: "concelho", path: "tipo_membro", path: "area_interesse", path: "razoes_voluntario"}})
        .exec(function(error, result)
        {
            if (error) return console.error(error);
            callback(result);
        });
    }
    else
    {
        Atividade_Interna.find(search)
        .populate("projeto_interno")
        .populate({path: "candidatos", model: "Voluntario", populate: {path: "concelho", path: "tipo_membro", path: "area_interesse", path: "razoes_voluntario"}})
        .populate({path: "participantes", model: "Voluntario", populate: {path: "concelho", path: "tipo_membro", path: "area_interesse", path: "razoes_voluntario"}})
        .exec(function(error, results)
        {
            if (error) return console.error(error);
            callback(results);
        });
    }  
}

function model()
{
    return Atividade_Interna;
}

module.exports.insert = insert;
module.exports.insertObj = insertObj;
module.exports.update = update;
module.exports.remove = remove;
module.exports.findAll = findAll;
module.exports.find = find;
module.exports.model = model;