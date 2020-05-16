const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Books = require("./models/books");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

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

const db = mongoose.connection;
db.on("error", console.error.bind(console, "# MongoDB - connection error: "));
// --->>> SET UP SESSIONS <<<---
app.use(
  session({
    secret: "mySecretString",
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
    store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60}),
    //ttl stand for time to leave 2 days 24 hours 60 minutes 60 seconds
  })
);
// --->>> END SESSION SET UP <<<---

// --->>> Cart API <<<---
app.post("/cart", (req, res) => {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if (err) {
      throw err;
    }
    res.json(req.session.cart);
  });
});

app.get("/cart", (req, res) => {
  if (typeof req.session.cart !== undefined) {
    res.json(req.session.cart);
  }
});
// --->>> END Cart API <<<---

// --->>> Books API <<<---
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
/// --->>> END OF BOOK API <<<---

// --->>> GET BOOK IMAGES API <<<---
app.get("/images", (req, res) => {
  const imgFolder = __dirname + "/public/images/";
  // REQUIRE FILE SYSTEM
  const fs = require("fs");
  // READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgFolder, (err, files) => {
    if (err) {
      return console.error(err);
    }
    //CREATE AN EMPTY ARRAY
    const filesArr = [];
    // ITERATE OVER ALL IMAGES IN THE DIRECTORY AND ADD THEM TO THE ARRAY
    files.forEach((file) => {
      filesArr.push({name: file});
    });
    // SEND THE JSON RESPONSE WITH THE ARRAY
    res.json(files);
  });
});

// --->>> END OF GET BOOK IMAGES API <<<---

app.listen(5007, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`The API server is running on port 5007`);
});
