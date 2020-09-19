const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comissao =
{
    nome_completo:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    password:
    {
        type: String,
        required: true
    },
    data_criacao: 
    {
        type: Date,
        default: Date.now
    }
};

const Comissao = mongoose.model("Comissao", new Schema(comissao), "comissao");
module.exports = Comissao;