const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

const checkReadInCollection = require("../helper").checkReadInCollection;
const updateLikeCount = require("../helper").updateLikeCount;

module.exports = router.post("/", authenticate, async function(req, res) {
  const goodreadsId = req.body.id;
  const { bookCollectionId } = req.currentUser;

  try {
    const book = await Book.findOne({ goodreadsId });
    const id = book._id;
    await removeBookId(id);

    book.likeCounter > 1 || book.numberOfEntities >= 1
      ? await updateLikeCount(-1, id)
      : await Book.findByIdAndRemove(id);
    const collection = await BookCollection.findById(bookCollectionId);
    const readStatus = await checkReadInCollection(book._id, collection);
    await res.json({
      book: {
        ...book._doc,
        likeStatus: false,
        readStatus: readStatus.read,
        readPages: readStatus.readPages
      }
    });
  } catch (e) {
    res
      .status(500)
      .json({ errors: { global: "Error. Something went wrong." } });
  }

  function removeBookId(id) {
    return BookCollection.findByIdAndUpdate(
      bookCollectionId,
      { $pull: { likeBookList: id } },
      { new: true }
    );
  }
});
