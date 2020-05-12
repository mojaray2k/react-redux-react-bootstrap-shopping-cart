"use strict";
const express = require("express");
const path = require("path");

const app = express();

// middleware to define folder for static files
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(5006, () => {
  console.log("Server running on Port 5006");
});
