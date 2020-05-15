const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const Books = require("./models/books");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost:27017/bookshop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected"));

// API's
app.post("/books", (req, res) => {
  const book = req.body;

  Books.create(book, (err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.get("/books", (req, res) => {
  Books.find((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.delete("/books/:_id", (req, res) => {
  const query = {_id: req.params._id};

  Books.remove(query, (err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.put("/books/:_id", (req, res) => {
  const book = req.body;
  const query = {_id: req.params._id};
  // if the field doesn't exist $set will set a new field
  const update = {
    "$set": {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price,
    },
  };
  // when true return the updated document
  const options = {new: true};

  Books.findByIdAndUpdate(query, update, options, (err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});
// END API's

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
