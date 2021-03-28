const express = require("express");
const router = express.Router();
const test = require("../controllers/test");
const users = require("../controllers/users");

router.get("/api", test.getTestMessage);
router.post("/api/register", users.registerTeam);
router.post("/api/members", users.addMember);

module.exports = router;
