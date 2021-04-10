const express = require("express");
const router = express.Router();
const wigs = require("../controllers/wigs");

router.get("/api/wigs/:teamId", wigs.getWIGSByTeamId)
router.post("/api/wigs", wigs.createWIG);
router.put("/api/wigs/:wigId", wigs.updateWIG);
router.delete("/api/wigs/:wigId", wigs.deleteWIG);

module.exports = router;
