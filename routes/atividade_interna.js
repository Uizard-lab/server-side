const Atividade_Interna = require("../database/collections/atividade_interna.js");
const Projeto_Interno = require("../database/collections/projeto_interno.js");
const Voluntario = require("../database/collections/voluntario.js");
const Comissao = require("../database/collections/comissao.js");
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
        const data =
        {
            projeto_interno: request.body.projeto_interno,
            nome: request.body.nome,
            objetivo: request.body.objetivo,
            descricao: request.body.descricao,
            data_atividade: request.body.data_atividade,
            horario: request.body.horario,
            observacoes: request.body.observacoes,
            candidatos: request.body.candidatos,
            participantes: request.body.participantes,
            concluido: request.body.concluido,
            aprovado: request.body.aprovado,
            data_criacao: request.body.data_criacao
        };

        Atividade_Interna.insert(data, function(result)
        {
            Projeto_Interno.find("_id", data.projeto_interno, true, function(projeto)
            {
                if (projeto.voluntario)
                {
                    Voluntario.find("_id", projeto.voluntario, true, function(voluntario)
                    {
                        emailer.candidaturaAtividade(voluntario.email, voluntario.nome_completo, true, data.nome);
                    });
                }
                else
                {
                    Comissao.find("_id", projeto.comissao, true, function(comissao)
                    {
                        emailer.candidaturaAtividade(comissao.email, comissao.nome_completo, true, data.nome);
                    });
                }
            });
            response.json(result);
        });
    }
    else response.json("No Token found!");
});

router.post("/:projeto_interno", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const data =
        {
            projeto_interno: request.params.projeto_interno,
            nome: request.body.nome,
            objetivo: request.body.objetivo,
            descricao: request.body.descricao,
            data_atividade: request.body.data_atividade,
            horario: request.body.horario,
            observacoes: request.body.observacoes,
            candidatos: request.body.candidatos,
            participantes: request.body.participantes,
            concluido: request.body.concluido,
            aprovado: request.body.aprovado,
            data_criacao: request.body.data_criacao
        };

        Atividade_Interna.insert(data, function(result)
        {
            Projeto_Interno.find("_id", data.projeto_interno, true, function(projeto)
            {
                if (projeto.voluntario)
                {
                    Voluntario.find("_id", projeto.voluntario, true, function(voluntario)
                    {
                        emailer.candidaturaAtividade(voluntario.email, voluntario.nome_completo, true, data.nome);
                    });
                }
                else
                {
                    Comissao.find("_id", projeto.comissao, true, function(comissao)
                    {
                        emailer.candidaturaAtividade(comissao.email, comissao.nome_completo, true, data.nome);
                    });
                }
            });
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
            projeto_interno: request.body.projeto_interno,
            nome: request.body.nome,
            objetivo: request.body.objetivo,
            descricao: request.body.descricao,
            data_atividade: request.body.data_atividade,
            horario: request.body.horario,
            observacoes: request.body.observacoes,
            candidatos: request.body.candidatos,
            participantes: request.body.participantes,
            concluido: request.body.concluido,
            aprovado: request.body.aprovado,
            data_criacao: request.body.data_criacao
        };

        Atividade_Interna.update(data, function(result)
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
            projeto_interno: request.body.projeto_interno,
            nome: request.body.nome,
            objetivo: request.body.objetivo,
            descricao: request.body.descricao,
            data_atividade: request.body.data_atividade,
            horario: request.body.horario,
            observacoes: request.body.observacoes,
            candidatos: request.body.candidatos,
            participantes: request.body.participantes,
            concluido: request.body.concluido,
            aprovado: request.body.aprovado,
            data_criacao: request.body.data_criacao
        };

        Atividade_Interna.update(data, function(result)
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

        Atividade_Interna.update(data, function(result)
        {
            Projeto_Interno.find("_id", result.projeto_interno, true, function(projeto)
            {
                if (projeto.voluntario)
                {
                    Voluntario.find("_id", projeto.voluntario, true, function(voluntario)
                    {
                        emailer.candidaturaAtividadeAprovado(voluntario.email, voluntario.nome_completo, true, result.nome);
                    });
                }
                else
                {
                    Comissao.find("_id", projeto.comissao, true, function(comissao)
                    {
                        emailer.candidaturaAtividadeAprovado(comissao.email, comissao.nome_completo, true, result.nome);
                    });
                }
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

        Atividade_Interna.update(data, function(result)
        {
            Projeto_Interno.find("_id", result.projeto_interno, true, function(projeto)
            {
                if (projeto.voluntario)
                {
                    Voluntario.find("_id", projeto.voluntario, true, function(voluntario)
                    {
                        emailer.candidaturaAtividadeAprovado(voluntario.email, voluntario.nome_completo, true, result.nome);
                    });
                }
                else
                {
                    Comissao.find("_id", projeto.comissao, true, function(comissao)
                    {
                        emailer.candidaturaAtividadeAprovado(comissao.email, comissao.nome_completo, true, result.nome);
                    });
                }
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

        Atividade_Interna.find("_id", request.body._id, true, function(result)
        {
            let candidatos = result.candidatos;
            if (typeof candidatos === "undefined") candidatos = [];

            candidatos.push(decoded._id);

            const data =
            {
                _id: request.body._id,
                candidatos: candidatos
            };

            Atividade_Interna.update(data, function(result)
            {
                Projeto_Interno.find("_id", result.projeto_interno, true, function(projeto)
                {
                    Voluntario.find("_id", decoded._id, true, function(candidato)
                    {
                        if (projeto.voluntario)
                        {
                            Voluntario.find("_id", projeto.voluntario, true, function(voluntario)
                            {
                                emailer.candidatoAtividade(voluntario.email, voluntario.nome_completo, candidato.email, candidato.nome_completo, true, result.nome);
                            });
                        }
                        else
                        {
                            Comissao.find("_id", projeto.comisao, true, function(comissao)
                            {
                                emailer.candidatoAtividade(comissao.email, comissao.nome_completo, candidato.email, candidato.nome_completo, true, result.nome);
                            });
                        }
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

        Atividade_Interna.find("_id", request.params.id, true, function(result)
        {
            let candidatos = result.candidatos;
            if (typeof candidatos === "undefined") candidatos = [];

            candidatos.push(decoded._id);

            const data =
            {
                _id: request.params.id,
                candidatos: candidatos
            };

            Atividade_Interna.update(data, function(result)
            {
                Projeto_Interno.find("_id", result.projeto_interno, true, function(projeto)
                {
                    Voluntario.find("_id", decoded._id, true, function(candidato)
                    {
                        if (projeto.voluntario)
                        {
                            Voluntario.find("_id", projeto.voluntario, true, function(voluntario)
                            {
                                emailer.candidatoAtividade(voluntario.email, voluntario.nome_completo, candidato.email, candidato.nome_completo, true, result.nome);
                            });
                        }
                        else
                        {
                            Comissao.find("_id", projeto.comisao, true, function(comissao)
                            {
                                emailer.candidatoAtividade(comissao.email, comissao.nome_completo, candidato.email, candidato.nome_completo, true, result.nome);
                            });
                        }
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

        Atividade_Interna.find("_id", request.body._id, true, function(result)
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

            Atividade_Interna.update(data, function(result)
            {
                Voluntario.find("_id", request.body.participantes, true, function(candidato)
                {
                    emailer.candidatoAtividadeAprovado(candidato.email, candidato.nome_completo, true, result.nome);
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

        Atividade_Interna.find("_id", request.params.id, true, function(result)
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

            Atividade_Interna.update(data, function(result)
            {
                Voluntario.find("_id", request.params.participantes, true, function(candidato)
                {
                    emailer.candidatoAtividadeAprovado(candidato.email, candidato.nome_completo, true, result.nome);
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
    Atividade_Interna.findAll(function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region POR APROVAR
router.get("/poraprovar", function(request, response)
{
    Atividade_Interna.find("aprovado", false, false, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#region ALL ATIVIDADES DE PROJETO
router.get("/projeto", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        Atividade_Interna.find("projeto_interno", request.body._id, false, function(results)
        {
            response.send(results);
        });  
    }
    else response.json("No Token found!");
});

router.get("/projeto/:id", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        Atividade_Interna.find("projeto_interno", request.params.id, false, function(results)
        {
            response.send(results);
        });  
    }
    else response.json("No Token found!");
});
//#endregion

//#region ALL ATIVIDADES CANDIDATAR
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
            Projeto_Interno.find("_id", request.body._id, true, function(result)
            {
                if (result.voluntario === decoded._id) response.json("Não pode candidatar-se em atividades enquanto Gestor do projeto!");
                else if (result.participantes.includes(decoded._id))
                {
                    Atividade_Interna.find("projeto_interno", request.body._id, false, function(results)
                    {
                        const atividades = [];

                        results.forEach(function(atividade)
                        {
                            const is_candidato = projeto.candidatos.includes(decoded._id);
                            const is_participante = projeto.participantes.includes(decoded._id);

                            if (!is_candidato && !is_participante)
                                atividades.push(atividade);
                        });

                        response.send(atividades);
                    });
                }
                else response.json("Não pode candidatar-se em atividades sem ser participante do projeto!");
            });
        }
        else if (decoded.nome_organizacao) response.json("Não pode candidatar-se em atividades como Gestor!");
        else response.json("Não pode candidatar-se em atividades como Comissão!");
    }
    else response.json("No Token found!");
});

router.get("/user/candidatar/:id", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;

        if (decoded.concelho)
        {
            Projeto_Interno.find("_id", request.params.id, true, function(result)
            {
                if (result.voluntario === decoded._id) response.json("Não pode candidatar-se em atividades enquanto Gestor do projeto!");
                else if (result.participantes.includes(decoded._id))
                {
                    Atividade_Interna.find("projeto_interno", request.params.id, false, function(results)
                    {
                        const atividades = [];

                        results.forEach(function(atividade)
                        {
                            const is_candidato = projeto.candidatos.includes(decoded._id);
                            const is_participante = projeto.participantes.includes(decoded._id);

                            if (!is_candidato && !is_participante)
                                atividades.push(atividade);
                        });

                        response.send(atividades);
                    });
                }
                else response.json("Não pode candidatar-se em atividades sem ser participante do projeto!");
            });
        }
        else if (decoded.nome_organizacao) response.json("Não pode candidatar-se em atividades como Gestor!");
        else response.json("Não pode candidatar-se em atividades como Comissão!");
    }
    else response.json("No Token found!");
});
//#endregion

//#region ALL ATIVIDADES CANDIDATOS
router.get("/user/candidatos", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;
        const id = mongoose.Types.ObjectId(decoded._id);

        Atividade_Interna.find("candidatos", id, false, function(results)
        {
            response.send(results);
        });  
    }
    else response.json("No Token found!");
});
//#endregion

//#region ALL ATIVIDADES PARTICIPANTES
router.get("/user/participantes", function(request, response)
{
    const header = request.headers["authorization"];
    if (typeof header !== "undefined") 
    {
        const bearer = header.split(" ");
        const token = bearer[1];
        const decoded = jwt.decode(token).result;
        const id = mongoose.Types.ObjectId(decoded._id);

        Atividade_Interna.find("participantes", id, false, function(results)
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
    Atividade_Interna.find("_id", request.body._id, true, function(results)
    {
        response.send(results);
    });
});

router.get("/id/:id", function(request, response)
{
    Atividade_Interna.find("_id", request.params.id, true, function(results)
    {
        response.send(results);
    });
});
//#endregion

//#endregion

//#region DELETE
router.delete("/:id", function (request, response)
{
    Atividade_Interna.remove(request.params.id, function(result)
    {
        response.send(result);
    });
});

router.delete("/", function (request, response)
{
    Atividade_Interna.remove(request.body._id, function(result)
    {
        response.send(result);
    });
});
//#endregion

module.exports = router;