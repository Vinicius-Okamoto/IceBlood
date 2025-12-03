var dashboardModel = require("../models/dashboardModel");

function listarTemperaturas(req, res) {
    var idSensor = req.params.idSensor;

    dashboardModel.buscarTemperaturas(idSensor)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao carregar temperaturas:", erro);
            res.status(500).json(erro);
        });
}


module.exports = {
    listarTemperaturas
}
