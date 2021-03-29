require("../config/db");

exports.createLead = async (
  leadId,
  leadName,
  leadInterval,
  leadDataType,
  benchmarkExists,
  benchmark
) => {
  const docRef = db.collection("leads").doc(leadId);
  await docRef.set({
    leadId,
    leadName,
    leadInterval,
    leadDataType,
    benchmarkExists,
    benchmark,
  });
};
