const db = require("../config/db");

exports.createCommitment = async (
  commitmentId,
  userId,
  commitmentName,
  startDate,
  wigId,
  wigName,
  leadId,
  category
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
  });
};
