const router = require('express').Router();
const Book = require("../../../models/book");

module.exports = router.get("/", async function(req, res) {
  try {
    const num = 2;
    const topLikeBooks = await Book.find()
      .sort({ likeCounter: -1 })
      .limit(num);

    const topReadBooks = await Book.find()
      .sort({ numberOfEntities: -1 })
      .limit(num);

    await res.json({ books: { topLikeBooks, topReadBooks } });
  }
  catch(e) {
    await res.status(500).json({ error: 'Error. Something went wrong...' });
  }
});
