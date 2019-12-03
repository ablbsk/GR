import api from "../api";
import {
  FETCH_TOP_TYPE,
  FETCH_BOOK_DATA_TYPE,
  FETCH_USER_BOOKS_TYPE,
  SEARCH_BOOKS_BY_PAGE_TYPE,

  ADD_BOOK,
  DELETE_BOOK_ON_BOOK_PAGE,
  ADD_LIKE,
  UPDATE_PROGRESS,
  DELETE_BOOK_ON_DASHBOARD_PAGE,
  DELETE_BOOK_ON_HOME_PAGE,
  DELETE_LIKE_ON_BOOK_PAGE,
  ADD_LIKE_IN_LIST,
  ADD_BOOK_IN_LIST,
  DELETE_LIKE_ON_HOME_PAGE,
  DELETE_LIKE_ON_DASHBOARD_PAGE,
  UPDATE_PROGRESS_IN_LIST,
  CHANGE_FILTERS,
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

const fetchTop = makeActionCreator(FETCH_TOP_TYPE, 'REQUEST');
const fetchTopSuccess = makeActionCreator(FETCH_TOP_TYPE, 'SUCCESS', 'data');
const fetchTopFailure = makeActionCreator(FETCH_TOP_TYPE, 'FAILURE', 'error');

const fetchBookData = makeActionCreator(FETCH_BOOK_DATA_TYPE, 'REQUEST');
const fetchBookDataSuccess = makeActionCreator(FETCH_BOOK_DATA_TYPE, 'SUCCESS', 'data');
const fetchBookDataFailure = makeActionCreator(FETCH_BOOK_DATA_TYPE, 'FAILURE', 'error');

const fetchUserBooks = makeActionCreator(FETCH_USER_BOOKS_TYPE, 'REQUEST');
const fetchUserBooksSuccess = makeActionCreator(FETCH_USER_BOOKS_TYPE, 'SUCCESS', 'data');
const fetchUserBooksFailure = makeActionCreator(FETCH_USER_BOOKS_TYPE, 'FAILURE', 'error');

const searchBooksByPage = makeActionCreator(SEARCH_BOOKS_BY_PAGE_TYPE, 'REQUEST');
const searchSuccess = makeActionCreator(SEARCH_BOOKS_BY_PAGE_TYPE, 'SUCCESS', 'data');
const searchFailure = makeActionCreator(SEARCH_BOOKS_BY_PAGE_TYPE, 'FAILURE', 'error');

/* ======================================================================================== */

const addBook = data => ({
  type: ADD_BOOK,
  data
});

const addBookInList = data => ({
  type: ADD_BOOK_IN_LIST,
  data
});

const bookDeleteOnBookPage = data => ({
  type: DELETE_BOOK_ON_BOOK_PAGE,
  data
});

const bookDeleteOnDashboardPage = data => ({
  type: DELETE_BOOK_ON_DASHBOARD_PAGE,
  data
});

const bookDeleteOnHomePage = data => ({
  type: DELETE_BOOK_ON_HOME_PAGE,
  data
});

const addBookLike = data => ({
  type: ADD_LIKE,
  data
});

const addBookLikeInList = data => ({
  type: ADD_LIKE_IN_LIST,
  data
});

const likeDeleteOnBookPage = data => ({
  type: DELETE_LIKE_ON_BOOK_PAGE,
  data
});

const likeDeleteOnHomePage = data => ({
  type: DELETE_LIKE_ON_HOME_PAGE,
  data
});

const likeDeleteOnDashboardPage = data => ({
  type: DELETE_LIKE_ON_DASHBOARD_PAGE,
  data
});

const changeProgress = data => ({
  type: UPDATE_PROGRESS,
  data
});

const updateProgressInList = data => ({
  type: UPDATE_PROGRESS_IN_LIST,
  data
});

/* ============================================= */

export const getTop = () => dispatch =>
  api.books.getTop().then(dispatch(fetchTop()));

export const getTopSuccess = books => dispatch =>
  dispatch(fetchTopSuccess(books));

export const getTopFailure = error => dispatch =>
  dispatch(fetchTopFailure(error));

/* --------------------------------------------- */

export const getBookData = id => dispatch =>
  api.books.getBookData(id).then(dispatch(fetchBookData()));

export const getBookDataSuccess = book => dispatch =>
  dispatch(fetchBookDataSuccess(book));

export const getBookDataFailure = error => dispatch =>
  dispatch(fetchBookDataFailure(error));

/* --------------------------------------------- */

export const getUserBooks = () => dispatch =>
  api.books.fetchUserBooks().then(dispatch(fetchUserBooks()));

export const getUserBooksSuccess = books => dispatch =>
  dispatch(fetchUserBooksSuccess(books));

export const getUserBooksFailure = error => dispatch =>
  dispatch(fetchUserBooksFailure(error));

/* --------------------------------------------- */

export const search = title => () => api.books.search(title);

export const searchByPage = (title, pageNum) => dispatch =>
  api.books.searchByPage(title, pageNum).then(dispatch(searchBooksByPage()));

export const searchBooksSuccess = books => dispatch =>
  dispatch(searchSuccess(books));

export const searchBooksFailure = error => dispatch =>
  dispatch(searchFailure(error));

/* --------------------------------------------- */

export const readBook = goodreadsId => dispatch =>
  api.books.create(goodreadsId).then(data => dispatch(addBook(data)));

export const readBookInList = goodreadsId => dispatch =>
  api.books.create(goodreadsId).then(data => dispatch(addBookInList(data)));


/* --------------------------------------------- */

export const deleteBookOnBookPage = goodreadsId => dispatch =>
  api.books.delete(goodreadsId).then(data => dispatch(bookDeleteOnBookPage(data)));

export const deleteBookOnDashboardPage = goodreadsId => dispatch =>
  api.books.delete(goodreadsId).then(data => dispatch(bookDeleteOnDashboardPage(data)));

export const deleteBookOnHomePage = goodreadsId => dispatch =>
  api.books.delete(goodreadsId).then(data => dispatch(bookDeleteOnHomePage(data)));

/* --------------------------------------------- */

export const addLike = goodreadsId => dispatch =>
  api.books.addLike(goodreadsId).then(data => dispatch(addBookLike(data)));

export const addLikeInList = goodreadsId => dispatch =>
  api.books.addLike(goodreadsId).then(data => dispatch(addBookLikeInList(data)));

/* --------------------------------------------- */

export const deleteLikeOnBookPage = goodreadsId => dispatch =>
  api.books.deleteLike(goodreadsId).then(data => dispatch(likeDeleteOnBookPage(data)));

export const deleteLikeOnDashboardPage = goodreadsId => dispatch =>
  api.books.deleteLike(goodreadsId).then(data => dispatch(likeDeleteOnDashboardPage(data)));

export const deleteLikeOnHomePage = goodreadsId => dispatch =>
  api.books.deleteLike(goodreadsId).then(data => dispatch(likeDeleteOnHomePage(data)));

/* --------------------------------------------- */

export const updateBookProgress = (num, id) => dispatch =>
  api.books.updateProgress(num, id).then(progress => {
    dispatch(changeProgress(progress));
  });

export const updateBookProgressInList = (num, id) => dispatch =>
  api.books.updateProgress(num, id).then(progress => {
    dispatch(updateProgressInList(progress));
  });

const changeBookFilters = filter => ({
  type: CHANGE_FILTERS,
  filter
});

export const changeFilters = filter => dispatch =>
  dispatch(changeBookFilters(filter));

