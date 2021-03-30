const db = require("../config/db");

exports.getLead = async (leadId) => {
  const lead = await db.collection("leads").doc(leadId).get();
  if (!lead) {
    return { message: `No lead with id ${leadId} found` };
  } else {
    return lead.data();
  }
};

exports.updateLead = async (
  leadId,
  leadName,
  leadInterval,
  leadDataType,
  benchmarkExists,
  benchmark
) => {
  const docRef = db.collection("leads").doc(leadId);
  await docRef.update({
    leadId,
    leadName,
    leadInterval,
    leadDataType,
    benchmarkExists,
    benchmark,
  });
};

exports.deleteLead = async (leadId) => {
  return await db.collection("leads").doc(leadId).delete();
};
