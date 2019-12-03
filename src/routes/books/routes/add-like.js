const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

const getRequest = require("../helper").getRequest;
const fetchBookData = require("../helper").fetchBookData;
const updateLikeCount = require("../helper").updateLikeCount;

module.exports = router.post("/", authenticate, async function(req, res) {
  const { goodreadsId } = req.body;
  const { bookCollectionId } = req.currentUser;

  try {
    const book = await Book.findOne({ goodreadsId });
    let entity = null;
    if (!book) {
      const resultRequest = await getRequest(goodreadsId);
      const data = await fetchBookData(resultRequest);
      entity = await Book.create({ ...data });
    } else {
      entity = book;
    }
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
