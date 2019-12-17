const request = require('request-promise');
const parseString = require('xml2js').parseString;
const Book = require("../../models/book");

function getRequest(goodreadsId) {
  return request.get(`https://www.goodreads.com/book/show.xml?key=FJ8QTTCeXMYySmerRew60g&id=${goodreadsId}`);
}

function getSearchRequest(query, page = 1) {
  return request.get(
    `https://www.goodreads.com/search/index.xml?key=FJ8QTTCeXMYySmerRew60g&q=${query}&page=${page}`
  )
}

function fetchBookData(result) {
  return new Promise((resolve, reject) => {
    parseString(result, (err, goodreadsResult) => {
      const path = goodreadsResult.GoodreadsResponse.book[0];
      const book = {
        goodreadsId: path.id[0],
        image_url: path.image_url[0],
        title: path.title[0],
        description: path.description[0],
        authors: path.authors[0].author[0].name[0],
        average_rating: Number(path.average_rating[0]),
        pages: Number(path.num_pages[0]),
        publisher: path.publisher[0],
        publication_day: Number(path.publication_day[0]),
        publication_month: Number(path.publication_month[0]),
        publication_year: Number(path.publication_year[0]),
        format: path.format[0]
      };
      err ? reject(err) : resolve(book);
    });
  });
}

function checkReadInCollection(id, collection) {
  const { list } = collection;
  const i = list.findIndex(item => item.bookId.equals(id));
  return i !== -1 ? { read: true, readPages: list[i].readPages } : false;
}

function checkLikeInCollection(id, collection) {
  const { likeBookList } = collection;
  return likeBookList.indexOf(id) !== -1;
}

function updateLikeCount(i, id) {
  return Book.findByIdAndUpdate(id, {$inc: {likeCounter: i}}, {new: true});
}

function updateEntitiesCount(i, id) {
  return Book.findByIdAndUpdate(id, { $inc: { numberOfEntities: i } }, { new: true });
}

function addStatus(likeBookList, books, readBookIds, bookList) {
  return books.map(book => {
    book = book.toJSON();
    if (likeBookList.length === 0) {
      book.likeStatus = false;
    } else {
      for (let i = 0; i < likeBookList.length; i++) {
        if (book._id.equals(likeBookList[i])) {
          book.likeStatus = true;
          break;
        } else {
          book.likeStatus = false;
        }
      }
    }

    if (readBookIds.length === 0) {
      book.readPages = 0;
      book.readStatus = false;
    } else {
      for (let i = 0; i < readBookIds.length; i++) {
        if (book._id.equals(readBookIds[i])) {
          book.readPages = bookList[i].readPages;
          book.readStatus = true;
          break;
        } else {
          book.readPages = 0;
          book.readStatus = false;
        }
      }
    }
    return book;
  });
}

async function createBook(goodreadsId) {
  const book = await Book.findOne({ goodreadsId });
  if (!book) {
    const resultRequest = await getRequest(goodreadsId);
    const data = await fetchBookData(resultRequest);
    return Book.create({ ...data });
  } else {
    return book;
  }
}

module.exports = { addStatus, getSearchRequest, checkReadInCollection, checkLikeInCollection, fetchBookData, updateLikeCount, getRequest, updateEntitiesCount, createBook };
