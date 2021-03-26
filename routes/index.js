const express = require("express");
const router = express.Router();
const test = require("../controllers/test");

/* GET home page. */
router.get("/api", test.getTestMessage);

module.exports = router;
