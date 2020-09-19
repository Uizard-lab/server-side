const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const concelho =
{
    nome:
    {
        type: String,
        required: true
    }
};

const Concelho = mongoose.model("Concelho", new Schema(concelho), "concelho");
module.exports = Concelho;
