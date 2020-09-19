const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voluntario =
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
    telemovel:
    {
        type: String,
        required: true
    },
    concelho:
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Concelho"
    },
    data_nascimento:
    {
        type: Date,
        required: true
    },
    tipo_membro:
    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Tipo_Membro"
    },
    escola_servico:
    {
        type: String,
        required: true
    },
    curso_formacao:
    {
        type: String,
        required: true
    },
    areas_interesse:
    {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: "Area_Interesse"
    },
    razoes_voluntario:
    {
        type: [Schema.Types.ObjectId],
        required: true, 
        ref: "Razao_Voluntario"
    },
    observacoes:
    {
        type: String,
        required: false
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

const Voluntario = mongoose.model("Voluntario", new Schema(voluntario), "voluntario");
module.exports = Voluntario;
