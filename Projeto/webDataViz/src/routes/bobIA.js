const express = require("express");
const router = express.Router();

const { perguntar } = require("../controllers/bobIAController");

router.post("/perguntar", perguntar);

module.exports = router;
