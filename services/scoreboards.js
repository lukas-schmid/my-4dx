const db = require("../config/db");

exports.getScoreboard = async (scoreboardId) => {
  const scoreboard = await db.collection("scoreboards").doc(scoreboardId).get();
  if (!scoreboard) {
    return { message: `No scoreboard with id ${scoreboardId} found` };
  } else {
    return scoreboard.data();
  }
};

exports.deleteScoreboard = async (scoreboardId) => {
  return await db.collection("scoreboards").doc(scoreboardId).delete();
};
