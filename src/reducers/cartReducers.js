export const cartReducers = function (state = {cart: []}, action) {
  const {type, payload, _id, unit} = action;

  switch (type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: payload,
        totalAmount: totals(payload).amount,
        totalQty: totals(payload).qty,
      };

    case "UPDATE_CART":
      // Create a Copy of the current cart array
      // const currentBookToUpdate = [...state.cart];
      // const indexToUpdate = currentBookToUpdate.findIndex((book) => {
      //   return book._id === action._id;
      // });
      // const newBookToUpdate = {
      //   ...currentBookToUpdate[indexToUpdate],
      //   quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit,
      // };
      // let cartUpdate = [
      //   ...currentBookToUpdate.slice(0, indexToUpdate),
      //   newBookToUpdate,
      //   ...currentBookToUpdate.slice(indexToUpdate + 1),
      // ];
      // return {
      //   ...state,
      //   cart: cartUpdate,
      //   totalAmount: totals(cartUpdate).amount,
      //   totalQty: totals(cartUpdate).qty,
      // };
      return {
        ...state,
        cart: payload,
        totalAmount: totals(payload).amount,
        totalQty: totals(payload).qty,
      };

    case "DELETE_CART_ITEM":
      return {
        ...state,
        cart: payload,
        totalAmount: totals(payload).amount,
        totalQty: totals(payload).qty,
      };

    default:
      return state;
  }
};

// CALCULATE TOTALS
export function totals(payload) {
  const totalAmount = payload
    .map((cart) => {
      return cart.price * cart.quantity;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0); // start the sum from an index of 0

  const totalQty = payload
    .map((qty) => {
      return qty.quantity;
    })
    .reduce((a, b) => {
      return a + b;
    }, 0);

  return {amount: totalAmount.toFixed(2), qty: totalQty};
}
