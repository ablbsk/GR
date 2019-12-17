const router = require("express").Router();

router.use("/get_top", require("./routes/get-top"));

router.use("/search", require("./routes/search"));
router.use("/search_by_page", require("./routes/search-by-page"));

router.use("/fetch_book_data", require("./routes/fetch-book-data"));
router.use("/", require("./routes/get-user-books"));

router.use("/", require("./routes/add-book"));
router.use("/delete_book", require("./routes/delete-book"));

router.use("/add_like", require("./routes/add-like"));
router.use("/delete_like", require("./routes/delete-like"));

router.use("/save_progress", require("./routes/save-progress"));

module.exports = router;
