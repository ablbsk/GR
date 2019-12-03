const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

const updateLikeCount = require("../helper").updateLikeCount;

module.exports = router.post("/", authenticate, async function(req, res) {
  const { goodreadsId } = req.body;
  const { bookCollectionId } = req.currentUser;

  try {
    const book = await Book.findOne({ goodreadsId });
    const id = book._id;
    await removeBookId(id);

    let updateBook;
    book.likeCounter > 1 || book.numberOfEntities >= 1
      ? updateBook = await updateLikeCount(-1, id)
      : await Book.findByIdAndRemove(id);
    await res.json({
      goodreadsId,
      likeCounter: updateBook.likeCounter,
      likeStatus: false,
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
