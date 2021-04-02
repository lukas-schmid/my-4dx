const db = require("../config/db");

exports.addLeadToWig = async (wigId, leadMeasures) => {
  const docRef = db.collection("wigs").doc(wigId);
  await docRef.update({
    leadMeasures,
  });
};
