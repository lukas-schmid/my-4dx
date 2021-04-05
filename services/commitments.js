const db = require("../config/db");

exports.getAllCommitmentsByWigId = async (wigId) => {
  const userCollection = [];
  const docRef = db.collection("commitments").where("wigId", "==", wigId);
  const commitments = await docRef.get();
  if (commitments.empty) {
    console.log("No matching documents.");
    return;
  } else {
    commitments.forEach((doc) => {
      userCollection.push(doc.data());
    });

    return userCollection;
  }
};

exports.getAllCommitments = async (userId) => {
  const userCollection = [];
  const docRef = db.collection("commitments").where("userId", "==", userId);
  const commitments = await docRef.get();
  if (commitments.empty) {
    console.log("No matching documents.");
    return;
  } else {
    commitments.forEach((doc) => {
      userCollection.push(doc.data());
    });

    return userCollection;
  }
};

exports.getCommitment = async (commitmentId) => {
  const commitment = await db.collection("commitments").doc(commitmentId).get();
  if (!commitment) {
    return { message: `No commitment with id ${commitmentId} found` };
  } else {
    return commitment.data();
  }
};

exports.updateCommitment = async (
  commitmentId,
  userId,
  commitmentName,
  startDate,
  wigId,
  wigName,
  leadId,
  category,
  isCompleted
) => {
  const docRef = db.collection("commitments").doc(commitmentId);
  await docRef.set({
    commitmentId,
    userId,
    commitmentName,
    startDate,
    wigId,
    wigName,
    leadId,
    category,
    isCompleted
  });
};

exports.deleteCommitment = async (commitmentId) => {
  return await db.collection("commitments").doc(commitmentId).delete();
};
