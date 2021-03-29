const db = require("../config/db");

exports.getWig = async (wigId) => {
  const wig = await db.collection("wigs").doc(wigId).get();
  if (!wig) {
    return { message: `No wig with id ${wigId} found` };
  } else {
    return wig.data();
  }
};
