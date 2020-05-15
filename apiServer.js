const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Books = require("./models/books");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

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

app.listen(5007, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The API server is running on port 5007`);
});
