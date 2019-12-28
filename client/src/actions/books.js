import api from "../api";
import {
  FETCH_TOP_TYPE,
  FETCH_BOOK_DATA_TYPE,
  FETCH_USER_BOOKS_TYPE,
  SEARCH_BOOKS_BY_PAGE_TYPE,
  CHANGE_FILTERS_TYPE,
  SORTING_BOOKS_TYPE,

  ADD_BOOK_TYPE,
  DELETE_BOOK_TYPE,

  ADD_LIKE_TYPE,
  DELETE_LIKE_TYPE,

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

const addProps = data => data.map(item => {
  return { ...item, options: { whatLoading: null, error: null } }
});

/* ===================== FETCH_TOP ======================== */

export const getTop = () => dispatch =>
  api.books
    .getTop()
    .then(dispatch(makeActionCreator(FETCH_TOP_TYPE, 'REQUEST')()));

export const getTopSuccess = books => dispatch =>
  dispatch(makeActionCreator(FETCH_TOP_TYPE, 'SUCCESS', 'data')(addProps(books)));

export const getTopFailure = error => dispatch =>
  dispatch(makeActionCreator(FETCH_TOP_TYPE, 'FAILURE', 'error')(error));

/* ================== FETCH_BOOK_DATA ====================== */

export const getBookData = goodreadsId => dispatch =>
  api.books
    .getBookData(goodreadsId)
    .then(dispatch(makeActionCreator(FETCH_BOOK_DATA_TYPE, "REQUEST")()));

export const getBookDataSuccess = book => dispatch =>
  dispatch(makeActionCreator(FETCH_BOOK_DATA_TYPE, 'SUCCESS', 'data')(addProps([book])));

export const getBookDataFailure = error => dispatch =>
  dispatch(makeActionCreator(FETCH_BOOK_DATA_TYPE, 'FAILURE', 'error')(error));

/* ================== FETCH_USER_BOOKS ===================== */

export const getUserBooks = () => dispatch =>
  api.books
    .fetchUserBooks()
    .then(dispatch(makeActionCreator(FETCH_USER_BOOKS_TYPE, 'REQUEST')()));

export const getUserBooksSuccess = books => dispatch =>
  dispatch(makeActionCreator(FETCH_USER_BOOKS_TYPE, 'SUCCESS', 'data')(addProps(books)));

export const getUserBooksFailure = error => dispatch =>
  dispatch(makeActionCreator(FETCH_USER_BOOKS_TYPE, 'FAILURE', 'error')(error));

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

export const readBook = goodreadsId => dispatch =>
  api.books
    .create(goodreadsId)
    .then(dispatch(makeActionCreator(ADD_BOOK_TYPE, "REQUEST", 'data')({ goodreadsId: goodreadsId, whatLoading: 'read' })));

export const readBookSuccess = book => dispatch =>
  dispatch(makeActionCreator(ADD_BOOK_TYPE, 'SUCCESS', 'data')(book));

export const readBookFailure = error => dispatch =>
  dispatch(makeActionCreator(ADD_BOOK_TYPE, 'FAILURE', 'error')(error));

/* ========================= DELETE_BOOK ======================== */

export const deleteBook = goodreadsId => dispatch =>
  api.books
    .delete(goodreadsId)
    .then(dispatch(makeActionCreator(DELETE_BOOK_TYPE, 'REQUEST', 'data')({ goodreadsId: goodreadsId, whatLoading: 'read' })));

export const deleteBookSuccess = (book, onDashboardPage) => dispatch => {
  const suffix = onDashboardPage ? 'ON_DASHBOARD_PAGE_SUCCESS' : 'SUCCESS';
  return dispatch(makeActionCreator(DELETE_BOOK_TYPE, suffix, 'data')(book));
};

export const deleteBookFailure = error => dispatch =>
  dispatch(makeActionCreator(DELETE_BOOK_TYPE, 'FAILURE', 'error')(error));

/* =========================== ADD_LIKE ========================= */

export const addLike = goodreadsId => dispatch =>
  api.books
    .addLike(goodreadsId)
    .then(dispatch(makeActionCreator(ADD_LIKE_TYPE, "REQUEST", 'data')({ goodreadsId: goodreadsId, whatLoading: 'like' })));

export const addLikeSuccess = (book) => dispatch =>
  dispatch(makeActionCreator(ADD_LIKE_TYPE, 'SUCCESS', 'data')(book));

export const addLikeFailure = error => dispatch =>
  dispatch(makeActionCreator(ADD_LIKE_TYPE, 'FAILURE', 'error')(error));

/* ========================= DELETE_LIKE ======================== */

export const deleteLike = goodreadsId => dispatch =>
  api.books
    .deleteLike(goodreadsId)
    .then(dispatch(makeActionCreator(DELETE_LIKE_TYPE, 'REQUEST', 'data')({ goodreadsId: goodreadsId, whatLoading: 'like' })));

export const deleteLikeSuccess = (book, onDashboardPage) => dispatch => {
  const suffix = onDashboardPage ? 'ON_DASHBOARD_PAGE_SUCCESS' : 'SUCCESS';
  return dispatch(makeActionCreator(DELETE_LIKE_TYPE, suffix, 'data')(book));
};

export const deleteLikeFailure = error => dispatch =>
  dispatch(makeActionCreator(DELETE_BOOK_TYPE, 'FAILURE', 'error')(error));

/* ======================= UPDATE_PROGRESS ====================== */

export const updateProgress = (num, goodreadsId) => dispatch =>
  api.books
    .updateProgress(num, goodreadsId)
    .then(dispatch(makeActionCreator(UPDATE_PROGRESS_TYPE, "REQUEST", 'data')({ goodreadsId: goodreadsId, whatLoading: 'progress' })));

export const updateProgressSuccess = (book) => dispatch =>
  dispatch(makeActionCreator(UPDATE_PROGRESS_TYPE, 'SUCCESS', 'data')(book));

export const updateProgressFailure = error => dispatch =>
  dispatch(makeActionCreator(UPDATE_PROGRESS_TYPE, 'FAILURE', 'error')(error));
