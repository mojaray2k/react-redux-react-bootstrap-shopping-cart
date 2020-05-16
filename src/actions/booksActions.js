"use strict";
import axios from "axios";

// GET A BOOK
export const getBooks = () => {
  return function (dispatch) {
    axios
      .get("/api/books")
      .then((res) => {
        dispatch({
          type: "GET_BOOK",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_BOOK_REJECTED",
          payload: err,
        });
      });
  };
};

// POST A BOOK
export const postBooks = (book) => {
  return function (dispatch) {
    axios
      .post("/api/books", book)
      .then((res) => {
        dispatch({
          type: "POST_BOOK",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "POST_BOOK_REJECTED",
          payload: "There was an error, while adding a new book",
        });
      });
  };
};

// DELETE A BOOK
export const deleteBooks = (id) => {
  return (dispatch) => {
    axios
      .delete("/api/books/" + id)
      .then((res) => {
        dispatch({
          type: "DELETE_BOOK",
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_BOOK_REJECTED",
          payload: err,
        });
      });
  };
};
// UPDATE A BOOK
export const updateBooks = (book) => {
  return {
    type: "UPDATE_BOOK",
    payload: book,
  };
};

// BOOK FORM RESET BUTTON
export const resetButton = () => {
  return {
    type: "RESET_BUTTON",
  };
};
