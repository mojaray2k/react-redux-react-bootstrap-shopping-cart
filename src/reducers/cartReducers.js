export const cartReducers = function (state = { cart: [] }, action) {
  const { type, payload, _id, unit } = action;

  switch (type) {
    case "ADD_TO_CART":
      return { ...state, cart: payload };
    case "UPDATE_CART":
      // Create a Copy of the current cart array
      const currentBookToUpdate = [...state.cart];
      const indexToUpdate = currentBookToUpdate.findIndex((book) => {
        return book._id === action._id;
      });
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit,
      };
      let cartUpdate = [
        ...currentBookToUpdate.slice(0, indexToUpdate),
        newBookToUpdate,
        ...currentBookToUpdate.slice(indexToUpdate + 1),
      ];
      return { ...state, cart: cartUpdate };

    case "DELETE_CART_ITEM":
      return { ...state, cart: payload };

    default:
      return state;
  }
};
