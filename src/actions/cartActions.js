"use strict";
import axios from "axios";

// GET CART
export const getCart = () => {
  return function (dispatch) {
    axios
      .get("/api/cart")
      .then((res) => {
        dispatch({
          type: "GET_CART",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_CART_REJECTED",
          msg: "error when getting the cart",
        });
      });
  };
};

// ADD TO CART
export const addToCart = (cart) => {
  return function (dispatch) {
    axios
      .post("/api/cart", cart)
      .then((res) => {
        dispatch({
          type: "ADD_TO_CART",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_TO_CART_REJECTED",
          msg: "error when adding to the cart",
        });
      });
  };
};

// UPDATE CART
export const updateCart = (_id, unit, cart) => {
  const currentBookToUpdate = cart;
  const indexToUpdate = currentBookToUpdate.findIndex((book) => {
    return book._id === _id;
  });
  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + unit,
  };
  let cartUpdate = [
    ...currentBookToUpdate.slice(0, indexToUpdate),
    newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1),
  ];

  return function (dispatch) {
    axios
      .post("/api/cart", cartUpdate)
      .then((res) => {
        dispatch({
          type: "UPDATE_CART",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_CART_REJECTED",
          msg: "error when updating to the cart",
        });
      });
  };
};

// DELETE TO CART
export const deleteCartItem = (cart) => {
  return function (dispatch) {
    axios
      .post("/api/cart", cart)
      .then((res) => {
        dispatch({
          type: "DELETE_CART_ITEM",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_CART_ITEM_REJECTED",
          msg: "error when deleting an item from the cart",
        });
      });
  };
};
