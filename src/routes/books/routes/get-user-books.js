const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

module.exports = router.get("/", authenticate, async function(req, res) {
  try {
    const { bookCollectionId } = req.currentUser;
    const arrFields = ["title", "image_url", "authors", "average_rating", "goodreadsId", "pages", "numberOfEntities", "likeCounter"];
    const collection = await BookCollection.findById(bookCollectionId);
    const bookList = collection.list;
    const { likeBookList } = collection;
    const readBookIds = bookList.map(item => item.bookId);
    const ids = await filterIds(readBookIds, likeBookList);
    const books = await Book.find({ _id: { $in: ids } }, arrFields);
    const data = await addStatus(likeBookList, books, readBookIds, bookList);
    await res.json({ books: data });
  } catch (e) {
    res
      .status(500)
      .json({ errors: { global: "Error. Something went wrong." } });
  }

  function filterIds(readBookIds, likeBookList) {
    const ids = readBookIds.concat(likeBookList);
    return [...new Set(ids.map(item => item.toString()))];
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
