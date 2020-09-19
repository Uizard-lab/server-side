const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const atividade_externa =
{
    projeto_externo:
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Projeto_Externo"
    },
    nome:
    {
        type: String,
        required: true
    },
    objetivo:
    {
        type: String,
        required: true
    },
    descricao:
    {
        type: String,
        required: true
    },
    data_atividade:
    {
        type: Date,
        required: true
    },
    horario:
    {
        type: String,
        required: true
    },
    observacoes:
    {
        type: String,
        required: false
    },
    candidatos:
    {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: "Voluntario"
    },
    participantes:
    {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: "Voluntario"
    },
    concluido:
    {
        type: Boolean,
        required: true,
        default: false
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

const Atividade_Externa = mongoose.model("Atividade_Externa", new Schema(atividade_externa), "atividade_externa");
module.exports = Atividade_Externa;