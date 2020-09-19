const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projeto_interno =
{
    comissao:
    {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Comissao"
    },
    voluntario:
    {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Voluntario"
    },
    nome:
    {
        type: String,
        required: true
    },
    pessoa_contacto:
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
    telemovel:
    {
        type: String,
        required: true
    },
    resumo_projeto:
    {
        type: String,
        required: true
    },
    area_intervencao:
    {
        type: String,
        required: true
    },
    publico_alvo:
    {
        type: String,
        required: true
    },
    objetivos:
    {
        type: String,
        required: true
    },
    descricao_atividades:
    {
        type: String,
        required: true
    },
    formacao_especifica:
    {
        type: Boolean,
        required: true
    },
    tipo_formacao:
    {
        type: String,
        required: false
    },
    data_horario:
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
    entidades_envolvidas:
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
    em_destaque:
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

const Projeto_Interno = mongoose.model("Projeto_Interno", new Schema(projeto_interno), "projeto_interno");
module.exports = Projeto_Interno;