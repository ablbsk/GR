const router = require('express').Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

module.exports = router.post("/", authenticate, async function(req, res) {
  const readPages = req.body.num;
  const goodreadsId = req.body.id;
  const { bookCollectionId } = req.currentUser;

  try {
    const book = await Book.findOne({ goodreadsId });
    await bookCollectionUpdate(book._id);
    await res.json({ progress: { goodreadsId: book.goodreadsId, readPages } });
  } catch (e) {
    await res.status(500).json({ error: 'Error. Something went wrong...' });
  }

  function bookCollectionUpdate(id) {
    return BookCollection.update(
      { _id: bookCollectionId, "list.bookId": id },
      { $set: { "list.$.readPages": readPages } },
      { new: true }
    );
  }
});
