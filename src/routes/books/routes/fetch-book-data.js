const router = require("express").Router();
const authenticate = require("../../../middlewares/authenticate");
const Book = require("../../../models/book");
const BookCollection = require("../../../models/book-collection");

const checkLikeInCollection = require("../helper").checkLikeInCollection;
const checkReadInCollection = require("../helper").checkReadInCollection;
const getRequest = require("../helper").getRequest;
const fetchBookData = require("../helper").fetchBookData;

module.exports = router.get("/", authenticate, async function(req, res) {
  const { goodreadsId } = req.query;

  try {
    const book = await Book.findOne({ goodreadsId });
    const resultRequest = await getRequest(goodreadsId);
    const data = await fetchBookData(resultRequest);

    if (!req.currentUser) {
      await res.json({ book: data });
    }

    const { bookCollectionId } = req.currentUser;

    if (book) {
      const collection = await BookCollection.findById(bookCollectionId);
      const likeStatus = await checkLikeInCollection(book._id, collection);
      const readStatus = await checkReadInCollection(book._id, collection);
      await res.json({
        book: {
          ...data,
          likeStatus,
          readStatus: readStatus.read,
          readPages: readStatus.readPages
        }
      });
    } else {
      await res.json({
        book: {
          ...data,
          likeStatus: false,
          readStatus: false,
          readPages: 0
        }
      });
    }
  } catch(e) {
    await res.status(500).json({ error: 'Error. Something went wrong...' });
  }

});
