const Comissao = require("../database/collections/comissao.js");
const nodemailer = require("nodemailer");
const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: 
    {
        user: "noreply.ips.voluntariado@gmail.com",
        pass: "12321abc!"
    }
});

function createHeader(reciever)
{
    return "<p>Bom dia, " + reciever + "</p></br></br>"
}

function createBody(message)
{
    return "<p>" + message + "</p>";
}

function createFooter()
{
    return "</br></br><p><img src=\"https://www.ips.pt/ips_si/imagens/_ips-logotipo-site\"></img></p><p>Cumprimentos,</p><p>Sistema Automatizado de Notificações do Portal de Voluntariado do IPS</p>";
}

function createEmail(reciever, message)
{
    return createHeader(reciever) + createBody(message) + createFooter();
}

function createMailOptions(email, name, subject, message)
{
    return {
        from: "IPS Voluntariado Notifier",
        to: email,
        subject: subject,
        html: createEmail(name, message)
    };
}

function sendEmail(email, name, subject, message)
{
    transpoter.sendMail(createMailOptions(email, name, subject, message), function(error, data)
    {
        if (error) console.log("ERROR:\n\n" + error);
        else console.log("EMAIL SENT!");
    });
}

function notificarComissao(subject, message)
{
    Comissao.findAll(function(results)
    {
        results.forEach(function(comissao)
        {
            const email = comissao.email;
            const name = comissao.nome_completo;
            sendEmail(email, name, subject, message);
        });
    });
}

function candidaturaVoluntario(email, name)
{
    const subject = "Nova Candidatura de Voluntário"
    const message = "Obrigado por registrar-se no nosso Portal de Voluntariado do IPS, iremos proceder à análise da sua candidatura e à sua aprovação.";
    sendEmail(email, name, subject, message);

    const comissao_subject = subject + " por Aprovar";
    const comissao_message = "Existe uma nova candidatura de um Voluntário por Aprovar.<br>Voluntário: " + name + " | " + email + ".";
    notificarComissao(comissao_subject, comissao_message);
}

function candidaturaGestor(email, name)
{
    const subject = "Nova Candidatura de Gestor"
    const message = "Obrigado por registrar-se no nosso Portal de Voluntariado do IPS, iremos proceder à análise da sua candidatura e à sua aprovação.";
    sendEmail(email, name, subject, message);

    const comissao_subject = subject + " por Aprovar";
    const comissao_message = "Existe uma nova candidatura de um Gestor por Aprovar.<br>Gestor: " + name + " | " + email + ".";
    notificarComissao(comissao_subject, comissao_message);
}

function candidaturaVoluntarioAprovado(email, name)
{
    const subject = "Aprovada Candidatura de Voluntário"
    const message = "Obrigado por registrar-se no nosso Portal de Voluntariado do IPS, você foi aprovado como Voluntário no nosso Portal.";
    sendEmail(email, name, subject, message);
}

function candidaturaGestorAprovado(email, name)
{
    const subject = "Aprovada Candidatura de Gestor"
    const message = "Obrigado por registrar-se no nosso Portal de Voluntariado do IPS, você foi aprovado como Gestor no nosso Portal.";
    sendEmail(email, name, subject, message);
}

function candidaturaProjeto(email, name, interno, projeto)
{
    const subject = "Nova Candidatura de Projeto " + (interno === true ? "Interno" : "Externo");
    const message = "Obrigado por registrar um novo Projeto no nosso Portal de Voluntariado do IPS, iremos proceder à análise da sua candidatura e à sua aprovação.";
    sendEmail(email, name, subject, message);

    const comissao_subject = subject + " por Aprovar";
    const comissao_message = "Existe uma nova candidatura de um Projeto por Aprovar.<br>Pessoa Responsável: " + name + " | " + email + ".<br>ProjetO: " + projeto;
    notificarComissao(comissao_subject, comissao_message);
}

function candidaturaProjetoAprovado(email, name, interno, projeto)
{
    const subject = "Aprovada Candidatura de Projeto " + (interno === true ? "Interno Aprovado" : "Externo Aprovado")
    const message = "Obrigado por registrar um novo Projeto no nosso Portal de Voluntariado do IPS, o seu Projeto foi aprovado: " + projeto + ".";
    sendEmail(email, name, subject, message);
}

function candidaturaAtividade(email, name, interna, atividade)
{
    const subject = "Nova Candidatura de Atividade " + (interna === true ? "Interna" : "Externa");
    const message = "Obrigado por registrar uma nova Atividade no nosso Portal de Voluntariado do IPS, iremos proceder à análise da sua candidatura e à sua aprovação.";
    sendEmail(email, name, subject, message);

    const comissao_subject = subject + " por Aprovar";
    const comissao_message = "Existe uma nova candidatura de uma Atividade por Aprovar.<br>Pessoa Responsável: " + name + " | " + email + ".<br>Atividade: " + atividade;
    notificarComissao(comissao_subject, comissao_message);
}

function candidaturaAtividadeAprovado(email, name, interna, atividade)
{
    const subject = "Aprovada Candidatura de Atividade " + (interna === true ? "Interna Aprovado" : "Externa Aprovado")
    const message = "Obrigado por registrar uma nova Atividade no nosso Portal de Voluntariado do IPS, a sua Atividade foi aprovada: " + atividade + ".";
    sendEmail(email, name, subject, message);
}

function candidatoProjeto(email_responsavel, name_responsavel, email_voluntario, name_voluntario, interno, projeto)
{
    const subject_responsavel = "Novo Candidato por Aprovar em Projeto " + (interno === true ? "Interno - " + projeto : "Externo - " + projeto);
    const message_responsavel = "Existe um novo candidato por aprovar no Projeto " + (interno === true ? "Interno - " + projeto : "Externo - " + projeto) 
    + "<br>Voluntário: " + name_voluntario + " | " + email_voluntario;
    sendEmail(email_responsavel, name_responsavel, subject_responsavel, message_responsavel);

    const subject_voluntario = "Novo Candidato em Projeto " + (interno === true ? "Interno - " + projeto : "Externo - " + projeto);
    const message_voluntario = "Obrigado por se candidatar a participar no Projeto " + (interno === true ? "Interno - " + projeto : "Externo - " + projeto) 
    + "<br>O responsável irá proceder à análise e aprovação da sua candidatura.";
    sendEmail(email_voluntario, name_voluntario, subject_voluntario, message_voluntario);
}

function candidatoProjetoAprovado(email, name, interno, projeto)
{
    const subject = "Aprovado Candidato em Projeto " + (interno === true ? "Interno - " + projeto : "Externo - " + projeto);
    const message = "Obrigado por se candidatar a participar no Projeto " + (interno === true ? "Interno - " + projeto : "Externo - " + projeto) 
    + "<br>Você foi aprovado como novo Participante do Projeto.";
    sendEmail(email, name, subject, message);
}

function candidatoAtividade(email_responsavel, name_responsavel, email_voluntario, name_voluntario, interna, atividade)
{
    const subject_responsavel = "Novo Candidato por Aprovar em Atividade " + (interna === true ? "Interna - " + atividade : "Externa - " + atividade);
    const message_responsavel = "Existe um novo candidato por aprovar na Atividade " + (interna === true ? "Interna - " + atividade : "Externa - " + atividade) 
    + "<br>Voluntário: " + name_voluntario + " | " + email_voluntario;
    sendEmail(email_responsavel, name_responsavel, subject_responsavel, message_responsavel);

    const subject_voluntario = "Novo Candidato em Atividade " + (interna === true ? "Interna - " + atividade : "Externa - " + atividade);
    const message_voluntario = "Obrigado por se candidatar a participar na Atividade " + (interna === true ? "Interna - " + atividade : "Externa - " + atividade) 
    + "<br>O responsável irá proceder à análise e aprovação da sua candidatura.";
    sendEmail(email_voluntario, name_voluntario, subject_voluntario, message_voluntario);
}

function candidatoAtividadeAprovado(email, name, interna, atividade)
{
    const subject = "Aprovado Candidato em Atividade " + (interna === true ? "Interna - " + atividade : "Externa - " + atividade);
    const message = "Obrigado por se candidatar a participar na Atividade " + (interna === true ? "Interna - " + atividade : "Externa - " + atividade) 
    + "<br>Você foi aprovado como novo Participante da Atividade.";
    sendEmail(email, name, subject, message);
}

module.exports.candidaturaVoluntario = candidaturaVoluntario;
module.exports.candidaturaGestor = candidaturaGestor;
module.exports.candidaturaVoluntarioAprovado = candidaturaVoluntarioAprovado;
module.exports.candidaturaGestorAprovado = candidaturaGestorAprovado;
module.exports.candidaturaProjeto = candidaturaProjeto;
module.exports.candidaturaProjetoAprovado = candidaturaProjetoAprovado;
module.exports.candidaturaAtividade = candidaturaAtividade;
module.exports.candidaturaAtividadeAprovado = candidaturaAtividadeAprovado;
module.exports.candidatoProjeto = candidatoProjeto;
module.exports.candidatoProjetoAprovado = candidatoProjetoAprovado;
module.exports.candidatoAtividade = candidatoAtividade;
module.exports.candidatoAtividadeAprovado = candidatoAtividadeAprovado;