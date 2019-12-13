const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const BookCollection = require("../../../models/book-collection");

const createBook = require("../helper").createBook;
const updateLikeCount = require("../helper").updateLikeCount;

module.exports = router.post("/", authenticate, async function(req, res) {
  const { goodreadsId } = req.body;
  const { bookCollectionId } = req.currentUser;

  try {
    const entity = await createBook(goodreadsId);
    await addBookId(entity._id);
    const updateEntity = await updateLikeCount(1, entity._id);
    await res.json({
      goodreadsId,
      likeCounter: updateEntity.likeCounter,
      likeStatus: true
    });
  } catch (e) {
    res.status(500).json({ errors: { global: "Error. Something went wrong." } });
  }

  function addBookId(id) {
    return BookCollection.findByIdAndUpdate(
      bookCollectionId,
      { $push: { likeBookList: id } },
      { new: true }
    );
  }
});
