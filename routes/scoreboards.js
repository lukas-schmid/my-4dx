const express = require("express");
const router = express.Router();
const scoreboards = require("../controllers/scoreboards");

router.post("/api/scoreboards", scoreboards.createScoreboard);
router.delete("/api/scoreboards/:scoreboardId", scoreboards.deleteScoreboard);

module.exports = router;
