const db = require("../config/db");

exports.addUser = async (
  id,
  email,
  name,
  companyName,
  teamId,
  teamName,
  title,
  isAdmin,
  scoreboardInclude,
  leadMeasures
) => {
  const docRef = db.collection("users").doc(id);
  await docRef.set({
    id,
    email,
    name,
    companyName,
    teamId,
    teamName,
    title,
    isAdmin,
    scoreboardInclude,
    leadMeasures
  });
};
