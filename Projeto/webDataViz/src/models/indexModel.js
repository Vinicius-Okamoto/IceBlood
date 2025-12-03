var database = require("../database/config")

function enviar(email, mensagem) {
    console.log("ACESSEI O INDEX MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email, mensagem);
    var instrucaoSql = `
          INSERT INTO cliente (email, mensagem)
                VALUES ('${email}', '${mensagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    enviar
};