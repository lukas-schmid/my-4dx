const express = require("express");
const router = express.Router();
const test = require("../controllers/test");
const users = require("../controllers/users");

router.get("/api", test.getTestMessage);
router.get("/api/members/:teamId", users.getAllUsersFromTeam);
router.post("/api/register", users.registerTeam);
router.post("/api/members", users.addMember);
router.put("/api/members/:userId", users.updateMember);
router.delete("/api/members/:userId", users.deleteUser);

module.exports = router;
