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
    let entity = book ? book : await Book.create({ ...req.body.book });
    await bookCollectionUpdate(entity);
    const updateEntity = await updateEntitiesCount(1, entity._id);
    await res.json({
      goodreadsId,
      numberOfEntities: updateEntity.numberOfEntities,
      readStatus: true
    })
  } catch (e) {
    res
      .status(500)
      .json({ errors: { global: "Error. Something went wrong." } });
  }

  /* --------------------------------------------- */

  function bookCollectionUpdate(book) {
    return BookCollection.findOneAndUpdate(
      { _id: bookCollectionId },
      {
        $push: {
          list: {
            bookId: book._id,
            readPages: 0
          }
        }
      },
      { new: true }
    );
  }

});
