const db = require("../config/db");

exports.getLead = async (leadId) => {
  const lead = await db.collection("leads").doc(leadId).get();
  if (!lead) {
    return { message: `No lead with id ${leadId} found` };
  } else {
    return lead.data();
  }
};
