const express = require("express");
const router = express.Router();
const commitments = require("../controllers/commitments");

//router.get("/api/commitments/wigs/:wigId", commitments.getAllCommitmentsByWigId);
//router.get("/api/commitments/:userId", commitments.getAllCommitments);
router.put("/api/commitments/:commitmentId/users/:userId", commitments.updateCommitment);
router.delete("/api/commitments/:commitmentId/users/:userId", commitments.deleteCommitment);
router.post("/api/commitments/:userId", commitments.createCommitment);

module.exports = router;
