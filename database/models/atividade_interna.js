const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const atividade_interna =
{
    projeto_interno:
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Projeto_Interno"
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

const Atividade_Interna = mongoose.model("Atividade_Interna", new Schema(atividade_interna), "atividade_interna");
module.exports = Atividade_Interna;