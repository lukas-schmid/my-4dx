require("../config/db");

exports.addtest = async (msg = "hello world") => {
  const docRef = db.collection("test").doc("test");
  await docRef.set({
    message: msg,
  });
};
