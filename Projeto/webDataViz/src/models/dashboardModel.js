var database = require("../database/config");

function buscarTemperaturas(token, idCamara) {
    var instrucao = `
        SELECT * FROM vwDashboard WHERE unidadeToken = '${token}' AND idCamara = ${idCamara} ;
    `;

    return database.executar(instrucao);
}
module.exports = {
    buscarTemperaturas
};
