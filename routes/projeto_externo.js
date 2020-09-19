const Projeto_Externo = require("../database/collections/projeto_externo.js");
const Gestor = require("../database/collections/gestor.js");
const Voluntario = require("../database/collections/voluntario.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const checkToken = require("./verifyToken.js");
const emailer = require("./emailer.js");
const mongoose = require("mongoose");
let router = express.Router();

//#region POST
router.post("/", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;
        const data =
        {
            gestor: decoded._id,
            designacao: request.body.designacao,
            pessoa_contacto: request.body.pessoa_contacto,
            email: request.body.email,
            telemovel: request.body.telemovel,
            resumo: request.body.resumo,
            area_intervencao: request.body.area_intervencao,
            publico_alvo: request.body.publico_alvo,
            objetivos: request.body.objetivos,
            descricao_atividades: request.body.descricao_atividades,
            formacao_especifica: request.body.formacao_especifica,
            tipo_formacao: request.body.tipo_formacao,
            data_horario: request.body.data_horario,
            areas_interesse: request.body.areas_interesse,
            entidades_envolvidas: request.body.entidades_envolvidas,
            logotipo: request.body.logotipo,
            observacoes: request.body.observacoes,
            candidatos: request.body.candidatos,
            participantes: request.body.participantes,
            concluido: request.body.concluido,
            em_destaque: request.body.em_destaque,
            aprovado: request.body.aprovado,
            data_criacao: request.body.data_criacao
        };

        Projeto_Externo.insert(data, function(result)
        {
            emailer.candidaturaProjeto(decoded.email, decoded.nome_organizacao, false, data.nome);
            response.json(result);
        });
    }
    else response.json("No Token found!");
});
//#endregion

//#region PUT

//#region Edit Project
router.post("/put", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const data =
        {
            _id: request.body._id,
            designacao: request.body.designacao,
            pessoa_contacto: request.body.pessoa_contacto,
            email: request.body.email,
            telemovel: request.body.telemovel,
            resumo: request.body.resumo,
            area_intervencao: request.body.area_intervencao,
            publico_alvo: request.body.publico_alvo,
            objetivos: request.body.objetivos,
            descricao_atividades: request.body.descricao_atividades,
            formacao_especifica: request.body.formacao_especifica,
            tipo_formacao: request.body.tipo_formacao,
            data_horario: request.body.data_horario,
            areas_interesse: request.body.areas_interesse,
            entidades_envolvidas: request.body.entidades_envolvidas,
            logotipo: request.body.logotipo,
            observacoes: request.body.observacoes,
            candidatos: request.body.candidatos,
            participantes: request.body.participantes,
            concluido: request.body.concluido,
            em_destaque: request.body.em_destaque,
            aprovado: request.body.aprovado,
            data_criacao: request.body.data_criacao
        };

        Projeto_Externo.update(data, function(result)
        {
            response.json(result);
        });
    }
    else response.json("No Token found!");
});

router.post("/put/:id", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const data =
        {
            _id: request.params.id,
            designacao: request.body.designacao,
            pessoa_contacto: request.body.pessoa_contacto,
            email: request.body.email,
            telemovel: request.body.telemovel,
            resumo: request.body.resumo,
            area_intervencao: request.body.area_intervencao,
            publico_alvo: request.body.publico_alvo,
            objetivos: request.body.objetivos,
            descricao_atividades: request.body.descricao_atividades,
            formacao_especifica: request.body.formacao_especifica,
            tipo_formacao: request.body.tipo_formacao,
            data_horario: request.body.data_horario,
            areas_interesse: request.body.areas_interesse,
            entidades_envolvidas: request.body.entidades_envolvidas,
            logotipo: request.body.logotipo,
            observacoes: request.body.observacoes,
            candidatos: request.body.candidatos,
            participantes: request.body.participantes,
            concluido: request.body.concluido,
            em_destaque: request.body.em_destaque,
            aprovado: request.body.aprovado,
            data_criacao: request.body.data_criacao
        };

        Projeto_Externo.update(data, function(result)
        {
            response.json(result);
        });
    }
    else response.json("No Token found!");
});
//#endregion

//#region Aprovar
router.post("/aprovar", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        const data =
        {
            _id: request.body._id,
            aprovado: true
        };

        Projeto_Externo.update(data, function(result)
        {
            Gestor.find("_id", result.gestor, true, function(gestor)
            {
                emailer.candidaturaProjetoAprovado(gestor.email, gestor.nome_organizacao, false, result.designacao);
            });
            response.json(result);
        });
    }
    else response.json("No Token found!");
});

router.post("/aprovar/:id", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        const data =
        {
            _id: request.params.id,
            aprovado: true
        };

        Projeto_Externo.update(data, function(result)
        {
            Gestor.find("_id", result.gestor, true, function(gestor)
            {
                emailer.candidaturaProjetoAprovado(gestor.email, gestor.nome_organizacao, false, result.designacao);
            });
            response.json(result);
        });
    }
    else response.json("No Token found!");
});
//#endregion

//#region Candidatos
router.post("/candidatos/add", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        Projeto_Externo.find("_id", request.body._id, true, function(result)
        {
            let candidatos = result.candidatos;
            if (typeof candidatos === "undefined") candidatos = [];

            candidatos.push(decoded._id);

            const data =
            {
                _id: request.body._id,
                candidatos: candidatos
            };

            Projeto_Externo.update(data, function(result)
            {
                Voluntario.find("_id", decoded._id, true, function(candidato)
                {
                    Gestor.find("_id", result.gestor, true, function(gestor)
                    {
                        emailer.candidatoProjeto(gestor.email, gestor.nome_organizacao, candidato.email, candidato.nome_completo, false, result.designacao);
                    });
                });
                response.json(result);
            });
        });
    }
    else response.json("No Token found!");
});

router.post("/candidatos/add/:id", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        Projeto_Externo.find("_id", request.params.id, true, function(result)
        {
            let candidatos = result.candidatos;
            if (typeof candidatos === "undefined") candidatos = [];

            candidatos.push(decoded._id);

            const data =
            {
                _id: request.params.id,
                candidatos: candidatos
            };

            Projeto_Externo.update(data, function(result)
            {
                Voluntario.find("_id", decoded._id, true, function(candidato)
                {
                    Gestor.find("_id", result.gestor, true, function(gestor)
                    {
                        emailer.candidatoProjeto(gestor.email, gestor.nome_organizacao, candidato.email, candidato.nome_completo, false, result.designacao);
                    });
                });
                response.json(result);
            });
        });
    }
    else response.json("No Token found!");
});
//#endregion

//#region Candidatos
router.post("/participantes/add", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        Projeto_Externo.find("_id", request.body._id, true, function(result)
        {
            let candidatos = result.candidatos;
            let participantes = result.participantes;
            if (typeof participantes === "undefined") participantes = [];

            participantes.push(request.body.participantes);

            const index = candidatos.indexOf(request.body.participantes);
            if (index > -1) candidatos.splice(index, 1);
            
            const data =
            {
                _id: request.body._id,
                participantes: participantes,
                candidatos: candidatos
            };

            Projeto_Externo.update(data, function(result)
            {
                Voluntario.find("_id", request.body.participantes, true, function(candidato)
                {
                    emailer.candidatoProjetoAprovado(candidato.email, candidato.nome_completo, false, result.designacao);
                });
                response.json(result);
            });
        });
    }
    else response.json("No Token found!");
});

router.post("/participantes/add/:id/:participantes", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        Projeto_Externo.find("_id", request.params.id, true, function(result)
        {
            let candidatos = result.candidatos;
            let participantes = result.participantes;
            if (typeof participantes === "undefined") participantes = [];

            participantes.push(request.params.participantes);

            const index = candidatos.indexOf(request.params.participantes);
            if (index > -1) candidatos.splice(index, 1);
            
            const data =
            {
                _id: request.params.id,
                participantes: participantes,
                candidatos: candidatos
            };

            Projeto_Externo.update(data, function(result)
            {
                Voluntario.find("_id", request.params.participantes, true, function(candidato)
                {
                    emailer.candidatoProjetoAprovado(candidato.email, candidato.nome_completo, false, result.designacao);
                });
                response.json(result);
            });
        });
    }
    else response.json("No Token found!");
});
//#endregion

//#endregion

//#region GET

//#region ALL
router.get("/", function(request, response)
{
    Projeto_Externo.findAll(function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region POR APROVAR
router.get("/poraprovar", function(request, response)
{
    Projeto_Externo.find("aprovado", false, false, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region ALL PROJETS OF LOGGED USER
router.get("/user", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        Projeto_Externo.find("gestor", decoded._id, false, function(results)
        {
            response.send(results);
        });
    }
    else response.json("No Token found!");
});
//#endregion

//#region ALL PROJETOS CANDIDATAR
router.get("/user/candidatar", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        if (decoded.concelho)
        {
            Projeto_Externo.findAll(function(results)
            {
                const projetos = [];

                results.forEach(function(projeto)
                {
                    const is_candidato = projeto.candidatos.includes(decoded._id);
                    const is_participante = projeto.participantes.includes(decoded._id);

                    if (!is_candidato && !is_participante)
                        projetos.push(projeto);
                });

                response.send(projetos);
            });
        }
        else if (decoded.nome_organizacao) response.json("Não pode candidatar-se em projetos como Gestor!");
        else response.json("Não pode candidatar-se em projetos como Comissão!");
    }
    else response.json("No Token found!");
});
//#endregion

//#region ALL PROJETOS CANDIDATOS
router.get("/user/candidatos", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;
        const id = mongoose.Types.ObjectId(decoded._id);

        Projeto_Externo.find("candidatos", id, false, function(results)
        {
            response.send(results);
        });  
    }
    else response.json("No Token found!");
});
//#endregion

//#region ALL PROJETOS PARTICIPANTES
router.get("/user/participantes", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;
        const id = mongoose.Types.ObjectId(decoded._id);

        Projeto_Externo.find("participantes", id, false, function(results)
        {
            response.send(results);
        });  
    }
    else response.json("No Token found!");
});
//#endregion

//#region ID
router.get("/id", function(request, response)
{
    Projeto_Externo.find("_id", request.body._id, true, function(results)
    {
        response.send(results);
    });
});

router.get("/id/:id", function(request, response)
{
    Projeto_Externo.find("_id", request.params.id, true, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#endregion

//#region DELETE
router.delete("/:id", function (request, response)
{
    Projeto_Externo.remove(request.params.id, function(result)
    {
        response.send(result);
    });
});

router.delete("/", function (request, response)
{
    Projeto_Externo.remove(request.body._id, function(result)
    {
        response.send(result);
    });
});
//#endregion

module.exports = router;