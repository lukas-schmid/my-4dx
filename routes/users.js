const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

// user management
router.get("/api/user/:userId", users.getUserById);
router.get("/api/members/:teamId", users.getAllUsersFromTeam);
router.post("/api/members/passwordreset", users.sendPasswortReset);
router.post("/api/members", users.addMember);
router.put("/api/members/:userId", users.updateMember);
router.delete("/api/members/:userId", users.deleteUser);

// register and login
router.post("/api/register", users.registerTeam);
router.post("/api/login", users.login);
router.post("/api/logout", users.logout);

module.exports = router;
