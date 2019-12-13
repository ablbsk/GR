const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const BookCollection = require("../../../models/book-collection");

const createBook = require("../helper").createBook;
const updateEntitiesCount = require("../helper").updateEntitiesCount;

module.exports = router.post("/", authenticate, async function(req, res) {
  const { goodreadsId } = req.body;
  const { bookCollectionId } = req.currentUser;

  try {
    const entity = await createBook(goodreadsId);
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
