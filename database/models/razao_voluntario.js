const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const razao_voluntario =
{
    razao:
    {
        type: String,
        required: true
    },
    global:
    {
        type: Boolean,
        required: true
    }
};

const Razao_Voluntario = mongoose.model("Razao_Voluntario", new Schema(razao_voluntario), "razao_voluntario");
module.exports = Razao_Voluntario;
