"use strict";
import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
// 3. define reducers
import reducers from "./reducers";
// IMPORT ACTIONS
import { addToCart } from "./actions/cartActions";
import { postBooks, deleteBooks, updateBooks } from "./actions/booksActions";
import BooksList from "./components/pages/booksList";

ReactDOM.render(<BooksList />, document.getElementById("app"));

// 1. create the store
const store = createStore(reducers, applyMiddleware(logger));

// 2. dispatch actions

// -->> BOOK ACTIONS <<--
// CREATE and Dispatch action
store.dispatch(
  postBooks([
    {
      id: 1,
      title: "This is the book title",
      description: "This is the book description",
      price: 33.33,
    },
    {
      id: 2,
      title: "This is the second book title",
      description: "This is the second book description",
      price: 50.33,
    },
    {
      id: 3,
      title: "This is the third book title",
      description: "This is the third book description",
      price: 60.33,
    },
  ])
);

// DELETE and Dispatch Action
store.dispatch(
  deleteBooks({
    id: 3,
  })
);

// UPDATE and Dispatch Action
store.dispatch(
  updateBooks({
    id: 2,
    title: "Learn React in 24hr",
  })
);

// -->> CART ACTIONS <<--
// ADD to cart
store.dispatch(addToCart([{ id: 2 }]));
