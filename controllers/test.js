const firebase = require("firebase/app");
const admin = require("firebase-admin");
const db = require("../config/db");
require("firebase/auth");
require("firebase/firestore");
require("../config/db");
const test = require("../models/test");

exports.addTest = async (req, res, next) => {
  try {
    await test.addtest();
    res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

exports.getTestMessage = async (req, res, next) => {
  const userCollection = [];
  const msg = db.collection("test");
  const snapshot = await msg.get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    res.status(404).json({ message: "Not Found" });
    return;
  }

  snapshot.forEach((doc) => {
    userCollection.push(doc.data());
  });
  res.status(200).json(userCollection);
};
