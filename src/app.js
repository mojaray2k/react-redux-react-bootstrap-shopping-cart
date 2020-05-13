"use strict";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
// 3. define reducers
import reducers from "./reducers";
// IMPORT ACTIONS
import { addToCart } from "./actions/cartActions";
import { postBooks, deleteBooks, updateBooks } from "./actions/booksActions";
import BooksList from "./components/pages/booksList";
const middleware = applyMiddleware(logger);

// 1. create the store
const store = createStore(reducers, composeWithDevTools(middleware));

ReactDOM.render(
  <Provider store={store}>
    <BooksList />
  </Provider>,
  document.getElementById("app")
);

// 2. dispatch actions
// -->> BOOK ACTIONS <<--
// CREATE and Dispatch action
// store.dispatch(
//   postBooks([

//   ])
// );
