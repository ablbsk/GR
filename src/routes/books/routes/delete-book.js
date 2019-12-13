const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

const updateEntitiesCount = require("../helper").updateEntitiesCount;

module.exports = router.post("/", authenticate, async function(req, res) {
  const { goodreadsId } = req.body;
  const { bookCollectionId } = req.currentUser;

  try {
    const book = await Book.findOne({ goodreadsId });
    let updateBook;
    await bookCollectionUpdate(book._id);
    if (book.numberOfEntities > 1 || book.likeCounter >= 1) {
      updateBook = await updateEntitiesCount(-1, book._id);
      await res.json({
        goodreadsId,
        numberOfEntities: updateBook.numberOfEntities,
        readStatus: false,
        readPages: 0
      });
    } else {
      await Book.findOneAndRemove({ goodreadsId });
      await res.json({
        goodreadsId,
        numberOfEntities: 0,
        readStatus: false,
        readPages: 0
      });
    }
  } catch (e) {
    res.status(500).json({ errors: { global: "Error. Something went wrong." } });
  }

  function bookCollectionUpdate(id) {
    return BookCollection.findByIdAndUpdate(
      bookCollectionId,
      { $pull: { list: { bookId: id } } },
      { new: true }
    );
  }
});
