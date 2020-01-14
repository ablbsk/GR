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

    if (req.currentUser) {
      const {bookCollectionId} = req.currentUser;
      const collection = await BookCollection.findById(bookCollectionId);
      const bookList = collection.list;
      const {likeBookList} = collection;
      const readBookIds = bookList.map(item => item.bookId);

      const topLikeBooksWithStatus = await addStatus(likeBookList, topLikeBooks, readBookIds, bookList);
      const topReadBooksWithStatus = await addStatus(likeBookList, topReadBooks, readBookIds, bookList);

      await res.json({
        books: {
          topLikeBooks: topLikeBooksWithStatus,
          topReadBooks: topReadBooksWithStatus
        }
      });
    } else {
      await res.json({ books: { topLikeBooks, topReadBooks } });
    }
  }
  catch(e) {
    await res.status(500).json({ errors: { global: 'Error. Something went wrong...' } });
  }
});
