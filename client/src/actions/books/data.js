import api from "../../api";
import { makeActionCreator } from "../helper";
import {
  FETCH_TOP_BOOK_DATA_TYPE,
  FETCH_BOOK_DATA_TYPE,
  FETCH_USER_BOOKS_DATA_TYPE,
} from "../../types";

const addPropsToTop = data => {
  const topLikeBooks = addLoading(data.topLikeBooks);
  const topReadBooks = addLoading(data.topReadBooks);
  return { topLikeBooks, topReadBooks };
};

const addLoading = data => data.map(item => {
  return { ...item, loading: { read: false, like: false, progress: false } }
});

/* ===================== FETCH_TOP_BOOK_DATA ===================== */

export const getTop = () => dispatch =>
  api.books
    .getTop()
    .then(dispatch(makeActionCreator(FETCH_TOP_BOOK_DATA_TYPE, 'REQUEST')()));

export const getTopSuccess = books => dispatch =>
  dispatch(makeActionCreator(FETCH_TOP_BOOK_DATA_TYPE, 'SUCCESS', 'data')(addPropsToTop(books)));

export const getTopFailure = error => dispatch =>
  dispatch(makeActionCreator(FETCH_TOP_BOOK_DATA_TYPE, 'FAILURE', 'error')(error));



/* ===================== FETCH_BOOK_DATA ===================== */

export const getBookData = goodreadsId => dispatch =>
  api.books
    .getBookData(goodreadsId)
    .then(dispatch(makeActionCreator(FETCH_BOOK_DATA_TYPE, "REQUEST")()));

export const getBookDataSuccess = book => dispatch =>
  dispatch(makeActionCreator(FETCH_BOOK_DATA_TYPE, 'SUCCESS', 'data')({ ...book, loading: { read: false, like: false, progress: false }}));

export const getBookDataFailure = error => dispatch =>
  dispatch(makeActionCreator(FETCH_BOOK_DATA_TYPE, 'FAILURE', 'error')(error));



/* ===================== FETCH_USER_BOOKS_DATA ===================== */

export const getUserBooks = () => dispatch =>
  api.books
    .fetchUserBooks()
    .then(dispatch(makeActionCreator(FETCH_USER_BOOKS_DATA_TYPE, 'REQUEST')()));

export const getUserBooksSuccess = books => dispatch =>
  dispatch(makeActionCreator(FETCH_USER_BOOKS_DATA_TYPE, 'SUCCESS', 'data')(addLoading(books)));

export const getUserBooksFailure = error => dispatch =>
  dispatch(makeActionCreator(FETCH_USER_BOOKS_DATA_TYPE, 'FAILURE', 'error')(error));
