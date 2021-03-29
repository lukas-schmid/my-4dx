require("../config/db");

exports.createWIG = async (
  wigId,
  wigName,
  lagName,
  lagDataType,
  lagInterval,
  startDate,
  endDate
) => {
  const docRef = db.collection("wigs").doc(wigId);
  await docRef.set({
    wigId,
    wigName,
    lagName,
    lagDataType,
    lagInterval,
    startDate,
    endDate,
  });
};
