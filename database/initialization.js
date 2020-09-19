const Area_Interesse = require("./collections/area_interesse.js");
const Concelho = require("./collections/concelho.js");
const Razao_Voluntario = require("./collections/razao_voluntario.js");
const Tipo_Membro = require("./collections/tipo_membro.js");
const Comissao = require("./collections/comissao.js");

function initialization()
{
    Tipo_Membro.model().find({}).exec(function(error, results)
    {
        if (error) return console.error(error);
        if (results.length > 0) console.log("DATABASE has already been initialized.");        
        else
        {
            console.log("DATABASE hasn't been initialized yet.");
            console.log("Inserting Starting Data...");
            Area_Interesse.insertStartingData();
            Concelho.insertStartingData();
            Razao_Voluntario.insertStartingData();
            Tipo_Membro.insertStartingData();
            Comissao.insert("Administrador", "ad@min.pt", "12345");
        }
    });
}

module.exports = initialization;