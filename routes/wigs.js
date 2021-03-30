const express = require("express");
const router = express.Router();
const wigs = require("../controllers/wigs");

router.post("/api/wigs", wigs.createWIG);

module.exports = router;
