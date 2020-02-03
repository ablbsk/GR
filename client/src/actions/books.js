import api from "../api";
import {
  FETCH_TOP_BOOK_DATA_TYPE,
  FETCH_BOOK_DATA_TYPE,
  FETCH_USER_BOOKS_DATA_TYPE,
  SEARCH_BOOKS_BY_PAGE_TYPE,
  CHANGE_FILTERS_TYPE,
  SORTING_BOOKS_TYPE,

  ADD_READ_BOOK_TYPE,
  DELETE_READ_BOOK_TYPE,

  ADD_LIKE_BOOK_TYPE,
  DELETE_LIKE_BOOK_TYPE,

  UPDATE_PROGRESS_TYPE
} from "../types";

function makeActionCreator(type, suffix, ...argNames) {
  return function(...args) {
    let action = { type: `${type}_${suffix}` };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    });
    return action;
  }
}

const addLoading = data => data.map(item => {
  return { ...item, loading: { read: false, like: false, progress: false } }
});

const addPropsToTop = data => {
  const topLikeBooks = addLoading(data.topLikeBooks);
  const topReadBooks = addLoading(data.topReadBooks);
  return { topLikeBooks, topReadBooks };
};

/* ===================== FETCH_TOP ======================== */

export const getTop = () => dispatch =>
  api.books
    .getTop()
    .then(dispatch(makeActionCreator(FETCH_TOP_BOOK_DATA_TYPE, 'REQUEST')()));

export const getTopSuccess = books => dispatch =>
  dispatch(makeActionCreator(FETCH_TOP_BOOK_DATA_TYPE, 'SUCCESS', 'data')(addPropsToTop(books)));

export const getTopFailure = error => dispatch =>
  dispatch(makeActionCreator(FETCH_TOP_BOOK_DATA_TYPE, 'FAILURE', 'error')(error));

/* ================== FETCH_BOOK_DATA ====================== */

export const getBookData = goodreadsId => dispatch =>
  api.books
    .getBookData(goodreadsId)
    .then(dispatch(makeActionCreator(FETCH_BOOK_DATA_TYPE, "REQUEST")()));

export const getBookDataSuccess = book => dispatch =>
  dispatch(makeActionCreator(FETCH_BOOK_DATA_TYPE, 'SUCCESS', 'data')({ ...book, loading: { read: false, like: false, progress: false }}));

export const getBookDataFailure = error => dispatch =>
  dispatch(makeActionCreator(FETCH_BOOK_DATA_TYPE, 'FAILURE', 'error')(error));

/* ================== FETCH_USER_BOOKS ===================== */

export const getUserBooks = () => dispatch =>
  api.books
    .fetchUserBooks()
    .then(dispatch(makeActionCreator(FETCH_USER_BOOKS_DATA_TYPE, 'REQUEST')()));

export const getUserBooksSuccess = books => dispatch =>
  dispatch(makeActionCreator(FETCH_USER_BOOKS_DATA_TYPE, 'SUCCESS', 'data')(addLoading(books)));

export const getUserBooksFailure = error => dispatch =>
  dispatch(makeActionCreator(FETCH_USER_BOOKS_DATA_TYPE, 'FAILURE', 'error')(error));

/* ========================= SEARCH ======================== */

export const search = title => () => api.books.search(title);

export const searchByPage = (title, pageNum) => dispatch =>
  api.books
    .searchByPage(title, pageNum)
    .then(dispatch(makeActionCreator(SEARCH_BOOKS_BY_PAGE_TYPE, 'REQUEST')()));

export const searchBooksSuccess = books => dispatch =>
  dispatch(makeActionCreator(SEARCH_BOOKS_BY_PAGE_TYPE, 'SUCCESS', 'data')(books));

export const searchBooksFailure = error => dispatch =>
  dispatch(makeActionCreator(SEARCH_BOOKS_BY_PAGE_TYPE, 'FAILURE', 'error')(error));

/* ======================= CHANGE_FILTERS ======================= */

export const changeFilters = filter => dispatch =>
  dispatch(makeActionCreator(CHANGE_FILTERS_TYPE, "", "filter")(filter));

/* ======================== SORTING_BOOKS ======================= */

export const sortingBooks = (key, order) => dispatch =>
  dispatch(makeActionCreator(SORTING_BOOKS_TYPE, "", "data")({ key, order }));

/* ========================== READ_BOOK ========================= */

export const readBook = (goodreadsId, location) => dispatch =>
  api.books
    .create(goodreadsId)
    .then(dispatch(makeActionCreator(ADD_READ_BOOK_TYPE, "REQUEST", 'payload')({ data: { goodreadsId }, location })));

export const readBookSuccess = (book, location) => dispatch =>
  dispatch(makeActionCreator(ADD_READ_BOOK_TYPE, 'SUCCESS', 'payload')({ data: book, location }));

export const readBookFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(ADD_READ_BOOK_TYPE, 'FAILURE', 'payload')({ error, location }));

/* ========================= DELETE_BOOK ======================== */

export const deleteBook = (goodreadsId, location) => dispatch =>
  api.books
    .delete(goodreadsId)
    .then(dispatch(makeActionCreator(DELETE_READ_BOOK_TYPE, 'REQUEST', 'payload')({ data: { goodreadsId }, location })));

export const deleteBookSuccess = (book, location) => dispatch => {
  return dispatch(makeActionCreator(DELETE_READ_BOOK_TYPE, 'SUCCESS', 'payload')({ data: book, location }));
};

export const deleteBookFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(DELETE_READ_BOOK_TYPE, 'FAILURE', 'payload')({ error, location }));

/* =========================== ADD_LIKE ========================= */

export const addLike = (goodreadsId, location) => dispatch =>
  api.books
    .addLike(goodreadsId)
    .then(dispatch(makeActionCreator(ADD_LIKE_BOOK_TYPE, "REQUEST", 'payload')({ data: { goodreadsId }, location })));

export const addLikeSuccess = (book, location) => dispatch =>
  dispatch(makeActionCreator(ADD_LIKE_BOOK_TYPE, 'SUCCESS', 'payload')({ data: book, location }));

export const addLikeFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(ADD_LIKE_BOOK_TYPE, 'FAILURE', 'payload')({ error, location }));

/* ========================= DELETE_LIKE ======================== */

export const deleteLike = (goodreadsId, location) => dispatch =>
  api.books
    .deleteLike(goodreadsId)
    .then(dispatch(makeActionCreator(DELETE_LIKE_BOOK_TYPE, 'REQUEST', 'payload')({ data: { goodreadsId }, location })));

export const deleteLikeSuccess = (book, location) => dispatch => {
  return dispatch(makeActionCreator(DELETE_LIKE_BOOK_TYPE, 'SUCCESS', 'payload')( { data: book, location }));
};

export const deleteLikeFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(DELETE_LIKE_BOOK_TYPE, 'FAILURE', 'payload')({ error, location }));

/* ======================= UPDATE_PROGRESS ====================== */

export const updateProgress = (num, goodreadsId, location) => dispatch =>
  api.books
    .updateProgress(num, goodreadsId)
    .then(dispatch(makeActionCreator(UPDATE_PROGRESS_TYPE, "REQUEST", 'payload')({ data: { goodreadsId }, location })));

export const updateProgressSuccess = (book, location) => dispatch =>
  dispatch(makeActionCreator(UPDATE_PROGRESS_TYPE, 'SUCCESS', 'payload')({ data: book, location }));

export const updateProgressFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(UPDATE_PROGRESS_TYPE, 'FAILURE', 'payload')({ error, location }));
