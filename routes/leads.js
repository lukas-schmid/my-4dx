const express = require("express");
const router = express.Router();
const leads = require("../controllers/leads");

router.post("/api/leads", leads.createLead);

module.exports = router;
