const express = require("express");
const router = express.Router();
const leads = require("../controllers/leads");

router.put("/api/:wigId/leads/:leadId", leads.updateLead);
router.post("/api/:wigId/leads", leads.createLead);
router.delete("/api/leads/:leadId", leads.deleteLead);

module.exports = router;
