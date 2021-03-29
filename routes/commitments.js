const express = require("express");
const router = express.Router();
const commitments = require("../controllers/commitments");

router.post("/api/commitments/:userId", commitments.createCommitment);

module.exports = router;
