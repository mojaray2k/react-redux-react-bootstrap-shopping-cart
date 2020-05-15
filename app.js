const createError = require("http-errors");
const express = require("express");
const path = require("path");
//PROXY
const httpProxy = require("http-proxy");

const app = express();

// PROXY to api
const apiProxy = httpProxy.createProxyServer({
  target: "http://localhost:5007",
});

app.use("/api", (req, res) => {
  apiProxy.web(req, res);
});
// END PROXY to api

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

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
  res.render("error");
});

module.exports = app;
