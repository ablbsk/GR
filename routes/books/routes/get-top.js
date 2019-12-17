const router = require('express').Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

const addStatus = require("../helper").addStatus;

module.exports = router.get("/", authenticate, async function(req, res) {
  try {
    const arrFields = ["goodreadsId", "title", "authors", "average_rating", "description", "image_url", "numberOfEntities", "likeCounter"];
    const num = 2;

    const topLikeBooks = await Book.find({}, arrFields)
      .sort({likeCounter: -1})
      .limit(num);

    const topReadBooks = await Book.find({}, arrFields)
      .sort({numberOfEntities: -1})
      .limit(num);

    const books = topLikeBooks.concat(topReadBooks);
    if (req.currentUser) {
      const {bookCollectionId} = req.currentUser;
      const collection = await BookCollection.findById(bookCollectionId);
      const bookList = collection.list;
      const {likeBookList} = collection;
      const readBookIds = bookList.map(item => item.bookId);
      const data = await addStatus(likeBookList, books, readBookIds, bookList);
      await res.json({ books: data });
    } else {
      await res.json({ books });
    }
  }
  catch(e) {
    await res.status(500).json({ errors: { global: 'Error. Something went wrong...' } });
  }
});
