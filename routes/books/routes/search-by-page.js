const router = require('express').Router();
const parseString = require('xml2js').parseString;

const getSearchRequest = require('../helper').getSearchRequest;

module.exports = router.get("/", async function (req, res) {
  const { q, page } = req.query;

  try {
    const resultRequest = await getSearchRequest(q, page);
    parseString(resultRequest, (err, goodreadsResult) => {
      const path = goodreadsResult.GoodreadsResponse.search[0];
      if (path["total-results"][0] === "0") {
        res.json({books: "Not found..."})
      } else {
        res.json({
          books: path.results[0].work.map(
            work => ({
              goodreadsId: work.best_book[0].id[0]._,
              title: work.best_book[0].title[0],
              authors: work.best_book[0].author[0].name[0],
              image_url: work.best_book[0].small_image_url[0],
              rating: typeof(work.average_rating[0]) === 'object'
                ? 0 : work.average_rating[0]
            })
          ),
          query_time_seconds: path["query-time-seconds"][0],
          total_results: path["total-results"][0]
        })
      }
    });
  }
  catch(e) {
    await res.status(500).json({ error: 'Error. Something went wrong...' });
  }
});
