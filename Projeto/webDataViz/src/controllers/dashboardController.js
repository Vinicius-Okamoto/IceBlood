var dashboardModel = require("../models/dashboardModel");

function listarTemperaturas(req, res) {
    var token = req.params.token;
    var idCamara = req.params.idCamara;

    dashboardModel.buscarTemperaturas(token, idCamara)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao carregar temperaturas:", erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    listarTemperaturas
};

