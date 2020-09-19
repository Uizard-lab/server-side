require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./database/database.js");

//Use json
app.use(bodyParser.json());
app.use(cors());

//Import routes
const auth = require("./routes/auth.js");
const area_interesse = require("./routes/area_interesse.js");
const atividade_externa = require("./routes/atividade_externa.js");
const atividade_interna = require("./routes/atividade_interna.js");
const comissao = require("./routes/comissao.js");
const concelho = require("./routes/concelho.js");
const gestor = require("./routes/gestor.js");
const projeto_externo = require("./routes/projeto_externo.js");
const projeto_interno = require("./routes/projeto_interno.js");
const razao_voluntario = require("./routes/razao_voluntario.js");
const tipo_membro = require("./routes/tipo_membro.js");
const voluntario = require("./routes/voluntario.js");

//Routes Middleware
app.use("/auth", auth);
app.use("/area_interesse", area_interesse);
app.use("/atividade_externa", atividade_externa);
app.use("/atividade_interna", atividade_interna);
app.use("/comissao", comissao);
app.use("/concelho", concelho);
app.use("/gestor", gestor);
app.use("/projeto_externo", projeto_externo);
app.use("/projeto_interno", projeto_interno);
app.use("/razao_voluntario", razao_voluntario);
app.use("/tipo_membro", tipo_membro);
app.use("/voluntario", voluntario);

database.connect(process.env.DB_KEY, true);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(5000, () => console.log("Listenning on port 5000..."));
