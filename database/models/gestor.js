const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gestor =
{
    nome_organizacao:
    {
        type: String,
        required: true,
        unique: true,
        dropDups: true
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
    aprovado:
    {
        type: Boolean,
        required: true,
        default: false
    },
    data_criacao: 
    {
        type: Date,
        default: Date.now
    }
};

const Gestor = mongoose.model("Gestor", new Schema(gestor), "gestor");
module.exports = Gestor;