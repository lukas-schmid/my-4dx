const db = require("../config/db");

exports.getCommitment = async (commitmentId) => {
  const commitment = await db.collection("commitments").doc(commitmentId).get();
  if (!commitment) {
    return { message: `No commitment with id ${commitmentId} found` };
  } else {
    return commitment.data();
  }
};
