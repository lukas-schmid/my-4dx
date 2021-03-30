const firebase = require("firebase/app");
const admin = require("firebase-admin");
require("firebase/auth");
require("firebase/firestore");
require("../config/auth");
//require("../config/db");
//const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const users = require("../models/users");
const service = require("../services/users");

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
    const body = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      companyName: req.body.companyName,
      teamId: uuidv4(),
      teamName: req.body.teamName,
      title: req.body.title,
      isAdmin: true,
      scoreboardInclude: true,
    };

    return await firebase
      .auth()
      .createUserWithEmailAndPassword(body.email, body.password)
      .then((userCredential) => {
        const user = userCredential.user;
        users.addUser(
          user.uid,
          body.email,
          body.name,
          body.companyName,
          body.teamId,
          body.teamName,
          body.title,
          body.isAdmin,
          body.scoreboardInclude
        );
        body.id = user.uid;
        res.status(201).json(body);
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

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const response = {
          isLoggedIn: true,
          userId: user.uid,
          email: user.email,
        };
        res.status(200).json(response);
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

exports.logout = async (req, res, next) => {
  //   const email = req.body.email;
  //   const password = req.body.password;
  try {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const response = {
          isLoggedIn: false,
        };
        res.status(200).json(response);
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

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await service.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.addMember = async (req, res, next) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      companyName: req.body.companyName,
      teamId: req.body.teamId,
      teamName: req.body.teamName,
      title: req.body.title,
      isAdmin: false,
      scoreboardInclude: true,
    };

    return await firebase
      .auth()
      .createUserWithEmailAndPassword(body.email, body.password)
      .then((userCredential) => {
        const user = userCredential.user;
        users.addUser(
          user.uid,
          body.email,
          body.name,
          body.companyName,
          body.teamId,
          body.teamName,
          body.title,
          body.isAdmin,
          body.scoreboardInclude
        );
        sendPasswordReset(body.email);
        body.id = user.uid;
        res.status(201).json(body);
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

exports.getAllUsersFromTeam = async (req, res, next) => {
  const teamId = req.params.teamId;
  try {
    const users = await service.getAllUsers(teamId);
    if (!users) {
      res.status(404).json({ message: "not found" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    next(err);
  }
};

exports.updateMember = async (req, res, next) => {
  const userId = req.params.userId;
  const email = req.body.email;
  const name = req.body.name;
  const companyName = req.body.companyName;
  const teamId = req.body.teamId;
  const teamName = req.body.teamName;
  const title = req.body.title;
  const isAdmin = req.body.isAdmin;
  const scoreboardInclude = req.body.scoreboardInclude;
  try {
    const user = await service.getUser(userId);
    await service.updateUser(
      user.id,
      email,
      name,
      companyName,
      teamId,
      teamName,
      title,
      isAdmin,
      scoreboardInclude
    );
    const updatedUser = await service.getUser(userId);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    return await admin
      .auth()
      .deleteUser(userId)
      .then(async () => {
        await service.deleteUser(userId);
        res
          .status(204)
          .json({ message: `User with id ${userId} has been deleted` });
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
