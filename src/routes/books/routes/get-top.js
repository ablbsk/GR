const router = require('express').Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

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
    await res.status(500).json({ error: 'Error. Something went wrong...' });
  }

    function addStatus(likeBookList, books, readBookIds, bookList) {
      return books.map(book => {
        book = book.toJSON();
        if (likeBookList.length === 0) {
          book.likeStatus = false;
        } else {
          for (let i = 0; i < likeBookList.length; i++) {
            if (book._id.equals(likeBookList[i])) {
              book.likeStatus = true;
              break;
            } else {
              book.likeStatus = false;
            }
          }
        }

        if (readBookIds.length === 0) {
          book.readPages = 0;
          book.readStatus = false;
        } else {
          for (let i = 0; i < readBookIds.length; i++) {
            if (book._id.equals(readBookIds[i])) {
              book.readPages = bookList[i].readPages;
              book.readStatus = true;
              break;
            } else {
              book.readPages = 0;
              book.readStatus = false;
            }
          }
        }
        return book;
      });
  }
});
