const firebase = require("firebase/app");
const admin = require("firebase-admin");
//const db = require("../config/db");
require("firebase/auth");
require("firebase/firestore");
require("../config/auth");
require("../config/db");
const { v4: uuidv4 } = require("uuid");
const users = require("../models/users");

const sendPasswordReset = async (email) => {
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("email has been sent");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.registerTeam = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const companyName = req.body.companyName;
    const teamId = uuidv4();
    const teamName = req.body.teamName;
    const title = req.body.title;
    const isAdmin = true;
    const scoreboardInclude = true;

    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        users.addUser(
          user.uid,
          email,
          name,
          companyName,
          teamId,
          teamName,
          title,
          isAdmin,
          scoreboardInclude
        );
        res.status(201).json({ message: "New team created" });
      })
      .catch((error) => {
        const err = {
          errorCode: error.code,
          errorMessage: error.message,
        };
        res.status(401).json(err);
      });
  } catch (err) {
    next(err);
  }
};

exports.addMember = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const companyName = req.body.companyName;
    const teamId = req.body.teamId;
    const teamName = req.body.teamName;
    const title = req.body.title;
    const isAdmin = false;
    const scoreboardInclude = true;

    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        users.addUser(
          user.uid,
          email,
          name,
          companyName,
          teamId,
          teamName,
          title,
          isAdmin,
          scoreboardInclude
        );
        sendPasswordReset(email);
        res.status(201).json({ message: "New User created" });
      })
      .catch((error) => {
        const err = {
          errorCode: error.code,
          errorMessage: error.message,
        };
        res.status(401).json(err);
      });
  } catch (err) {
    next(err);
  }
};
