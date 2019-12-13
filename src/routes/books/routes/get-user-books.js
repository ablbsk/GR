const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

const addStatus = require("../helper").addStatus;

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
});
