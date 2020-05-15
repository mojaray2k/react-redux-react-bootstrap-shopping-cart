db.books.update(
  { _id: ObjectId("5ebda0bf1229b4654e39568c") },
  { $set: { title: "This title was updated" } }
);

db.books.remove({ _id: ObjectId("5ebda0bf1229b4654e39567c") });
