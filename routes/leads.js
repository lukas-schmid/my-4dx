const express = require("express");
const router = express.Router();
const leads = require("../controllers/leads");

router.post("/api/leads", leads.createLead);
router.put("/api/leads/:leadId", leads.updateLead);
router.delete("/api/leads/:leadId", leads.deleteLead);

module.exports = router;
