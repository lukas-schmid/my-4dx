const express = require("express");
const router = express.Router();
const leads = require("../controllers/leads");

//router.put("/api/:wigId/leads/:leadId", leads.updateLead);
router.delete("/api/:wigId/leads/:leadId", leads.deleteLead);
router.post("/api/:wigId/leads", leads.createLead);

module.exports = router;
