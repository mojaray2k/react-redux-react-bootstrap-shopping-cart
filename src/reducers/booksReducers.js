const initialState = {
  books: [
    {
      _id: 1,
      title: "This is the book title",
      description: "This is the book description",
      price: 33.33,
    },
    {
      _id: 2,
      title: "This is the second book title",
      description: "This is the second book description",
      price: 50.33,
    },
    {
      _id: 3,
      title: "This is the third book title",
      description: "This is the third book description",
      price: 60.33,
    },
  ],
};

export const booksReducers = function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "GET_BOOK":
      return { ...state, books: [...state.books] };
    case "POST_BOOK":
      return { books: [...state.books, ...payload] };
    case "DELETE_BOOK":
      // Create a Copy of the current array of books
      const currentBookToDelete = [...state.books];
      // determine at which index in the books array is the book to be deleted
      const indexToDelete = currentBookToDelete.findIndex(function (book) {
        return book._id === payload._id;
      });
      return {
        books: [
          ...currentBookToDelete.slice(0, indexToDelete),
          ...currentBookToDelete.slice(indexToDelete + 1),
        ],
      };
    case "UPDATE_BOOK":
      // Create a Copy of the current array of books
      const currentBookToUpdate = [...state.books];
      // determine at which index in the books array is the book to be update
      const indexToUpdate = currentBookToUpdate.findIndex(function (book) {
        return book._id === payload._id;
      });
      // Create a new book object with new values and with the same array index of items we want to replace. To achieve this we will use ...spread but we could use concat method too
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: payload.title,
      };
      // This log has the purpose to show you how newBookToUpdate looks like
      console.log("What is it newBookToUpdate", newBookToUpdate);
      // use slice to remove the book at the specified index, replace with the new object and concatenate with the rest of items in the Array.
      return {
        books: [
          ...currentBookToUpdate.slice(0, indexToUpdate),
          newBookToUpdate,
          ...currentBookToUpdate.slice(indexToUpdate + 1),
        ],
      };
    default:
      return state;
  }
};
