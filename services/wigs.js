const db = require("../config/db");

exports.getWig = async (wigId) => {
  const wig = await db.collection("wigs").doc(wigId).get();
  if (!wig) {
    return { message: `No wig with id ${wigId} found` };
  } else {
    return wig.data();
  }
};

exports.getAllWigsByTeamId = async (teamId) => {
  const userCollection = [];
  const docRef = db.collection("wigs").where("teamId", "==", teamId);
  const wigs = await docRef.get();
  if (wigs.empty) {
    console.log("No matching documents.");
    return;
  } else {
    wigs.forEach((doc) => {
      userCollection.push(doc.data());
    });
    return userCollection;
  }
};

exports.updateWig = async (
  wigId,
  wigName,
  lagName,
  lagDataType,
  lagInterval,
  startDate,
  endDate
) => {
  const docRef = db.collection("wigs").doc(wigId);
  await docRef.update({
    wigId,
    wigName,
    lagName,
    lagDataType,
    lagInterval,
    startDate,
    endDate,
  });
};

exports.deleteWig = async (wigId) => {
  return await db.collection("wigs").doc(wigId).delete();
};
