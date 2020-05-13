export const cartReducers = function (state = { cart: [] }, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_CART":
      return { cart: [...state.cart, ...payload] };

    default:
      return state;
  }
};
