var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/temperaturas/:token/:idCamara", function (req, res) {
    dashboardController.listarTemperaturas(req, res);
});

module.exports = router;