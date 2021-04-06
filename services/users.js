const db = require("../config/db");

exports.getUser = async (userId) => {
  const userRef = db.collection("users").doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    return { message: `No user with id ${userId} found` };
  } else {
    return doc.data();
  }
};

exports.getAllUsers = async (teamId) => {
  const userCollection = [];
  const docRef = db.collection("users").where("teamId", "==", teamId);
  const users = await docRef.get();
  if (users.empty) {
    console.log("No matching documents.");
    return;
  } else {
    users.forEach((doc) => {
      userCollection.push(doc.data());
    });

    return userCollection;
  }
};

exports.updateUser = async (
  id,
  email,
  name,
  companyName,
  teamId,
  teamName,
  title,
  isAdmin,
  scoreboardInclude
) => {
  const docRef = db.collection("users").doc(id);
  await docRef.update({
    id,
    email,
    name,
    companyName,
    teamId,
    teamName,
    title,
    isAdmin,
    scoreboardInclude,
  });
};

exports.addUserLeadMeasure = async (
  id,
  leadMeasures
) => {
  const docRef = db.collection("users").doc(id);
  await docRef.update({
    id,
    leadMeasures
  });
};

exports.addUserCommitments = async (
  id,
  commitments
) => {
  const docRef = db.collection("users").doc(id);
  await docRef.update({
    id,
    commitments
  });
};


exports.updateCommitment = async (
  id,
  commitments
) => {
  const docRef = db.collection("users").doc(id);
  await docRef.update({
    id,
    commitments
  });
};

exports.deleteCommitment = async (
  id,
  commitments
) => {
  const docRef = db.collection("users").doc(id);
  await docRef.update({
    id,
    commitments
  });
};
