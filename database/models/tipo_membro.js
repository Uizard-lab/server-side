const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tipo_membro =
{
    tipo:
    {
        type: String,
        required: true
    }
};

const Tipo_Membro = mongoose.model("Tipo_Membro", new Schema(tipo_membro), "tipo_membro");
module.exports = Tipo_Membro;
