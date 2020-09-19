const fs = require("fs");
const mongoose = require("mongoose");
const initialization = require("./initialization.js");

function connect(dbKey, initialize)
{
    mongoose.connect(dbKey, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() 
    {
        if (initialize)
        {
            console.log("CONNECTED to Database!");
            initialization();
            //deleteDatabase(); 
        }       
    });
}

function deleteDatabase()
{
    mongoose.connection.db.dropDatabase(function(error)
    {
        if (error) return console.error(error);
        console.log("DELETED Database!");
    });
}

module.exports.connect = connect;