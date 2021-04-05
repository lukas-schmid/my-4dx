const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const users = require("./routes/users");
const wigs = require("./routes/wigs");
//const lags = require("./routes/lags"); delete!
const leads = require("./routes/leads");
const commitments = require("./routes/commitments");
// const scoreboards = require("./routes/scoreboards"); delete!

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/", users);
app.use("/", wigs);
//app.use("/", lags); delete!
app.use("/", leads);
app.use("/", commitments);
// app.use("/", scoreboards); delete!

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({ message: err.message });
  });

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
  // })
});

module.exports = app;
