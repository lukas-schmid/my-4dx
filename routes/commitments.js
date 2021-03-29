const express = require("express");
const router = express.Router();
const commitments = require("../controllers/commitments");

router.post("/api/commitments/:userId", commitments.createCommitment);
router.put("/api/commitments/:commitmentId", commitments.updateCommitment);
router.delete("/api/commitments/:commitmentId", commitments.deleteCommitment);

module.exports = router;
