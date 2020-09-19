const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const area_interesse =
{
    area:
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

const Area_Interesse = mongoose.model("Area_Interesse", new Schema(area_interesse), "area_interesse");
module.exports = Area_Interesse;
