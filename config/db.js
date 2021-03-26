const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = require(process.env.DB_ACCESS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = db = admin.firestore();
