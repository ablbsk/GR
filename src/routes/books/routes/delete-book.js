const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

const checkLikeInCollection = require("../helper").checkLikeInCollection;
const updateEntitiesCount = require("../helper").updateEntitiesCount;

module.exports = router.post("/", authenticate, async function(req, res) {
  const goodreadsId = req.body.id;
  const { bookCollectionId } = req.currentUser;

  try {
    const book = await Book.findOne({ goodreadsId });
    let updateBook;
    if (book.numberOfEntities > 1 || book.likeCounter >= 1) {
      updateBook = await updateEntitiesCount(-1, book._id);
    } else {
      await Book.findOneAndRemove({ goodreadsId });
    }
    await bookCollectionUpdate(book._id);
    const collection = await BookCollection.findById(bookCollectionId);
    const likeStatus = await checkLikeInCollection(book._id, collection);
    await res.json({ book: { ...updateBook._doc, likeStatus } });
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
