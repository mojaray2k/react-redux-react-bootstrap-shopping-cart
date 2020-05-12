"use strict";
import { createStore } from "redux";

// 3. define reducers
const reducer = function (state = { books: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    // case "INCREMENT":
    //   return state + payload;
    // case "DECREMENT":
    //   return state - payload;
    // case "POST_BOOK":
    //   return (state = payload);
    case "POST_BOOK":
      // let books = state.books.concat(payload);
      // return { books };
      return { books: [...state.books, ...payload] };
    default:
      return state;
  }
};

// 1. create the store
const store = createStore(reducer);

store.subscribe(() => {
  // console.log("current state is " + store.getState());
  console.log("current state is ", store.getState());
  // console.log("current price ", store.getState());
  // console.log("current price ", store.getState()[1].price);
});

// 2. dispatch actions
// store.dispatch({ type: "INCREMENT", payload: 1 });
// store.dispatch({ type: "INCREMENT", payload: 1 });
// store.dispatch({ type: "INCREMENT", payload: 1 });
// store.dispatch({ type: "DECREMENT", payload: 1 });
// store.dispatch({ type: "DECREMENT", payload: 1 });
// store.dispatch({ type: "DECREMENT", payload: 1 });

// CREATE and Dispatch action
store.dispatch({
  type: "POST_BOOK",
  payload: [
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
  ],
});

store.dispatch({
  type: "POST_BOOK",
  payload: [
    {
      id: 3,
      title: "This is the third book title",
      description: "This is the third book description",
      price: 60.33,
    },
  ],
});

// DELETE and Dispatch Action
