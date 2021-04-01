const db = require("../config/db");

exports.createWIG = async (
  wigId,
  wigName,
  teamId,
  lagName,
  lagDataType,
  lagCurrency,
  lagInterval,
  startDate,
  endDate,
  lagData,
  leadMeasures
) => {
  const docRef = db.collection("wigs").doc(wigId);
  await docRef.set({
    wigId,
    wigName,
    teamId,
    lagName,
    lagDataType,
    lagCurrency,
    lagInterval,
    startDate,
    endDate,
    lagData,
    leadMeasures,
  });
};
