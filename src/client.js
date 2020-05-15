"use strict";
import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
// 3. define reducers
import reducers from "./reducers";
import BooksList from "./components/pages/booksList";
import Main from "./main";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import BooksForm from "./components/pages/booksForm";
import Cart from "./components/pages/cart";

const middleware = applyMiddleware(thunk, logger);

// 1. create the store
const store = createStore(reducers, composeWithDevTools(middleware));

const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Main>
          <Switch>
            <Route exact path="/" component={BooksList} />
            <Route exact path="/admin" component={BooksForm} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </Main>
      </Fragment>
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(Routes, document.getElementById("app"));
