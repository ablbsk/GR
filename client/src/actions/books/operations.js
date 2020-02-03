import api from "../../api";
import { makeActionCreator } from "../helper";
import {
  ADD_READ_BOOK_TYPE,
  DELETE_READ_BOOK_TYPE,

  ADD_LIKE_BOOK_TYPE,
  DELETE_LIKE_BOOK_TYPE,

  UPDATE_PROGRESS_TYPE
} from "../../types";

/* ===================== ADD_READ_BOOK ===================== */

export const readBook = (goodreadsId, location) => dispatch =>
  api.books
    .create(goodreadsId)
    .then(dispatch(makeActionCreator(ADD_READ_BOOK_TYPE, "REQUEST", 'payload')({ data: { goodreadsId }, location })));

export const readBookSuccess = (book, location) => dispatch =>
  dispatch(makeActionCreator(ADD_READ_BOOK_TYPE, 'SUCCESS', 'payload')({ data: book, location }));

export const readBookFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(ADD_READ_BOOK_TYPE, 'FAILURE', 'payload')({ error, location }));



/* ===================== DELETE_READ_BOOK ===================== */

export const deleteBook = (goodreadsId, location) => dispatch =>
  api.books
    .delete(goodreadsId)
    .then(dispatch(makeActionCreator(DELETE_READ_BOOK_TYPE, 'REQUEST', 'payload')({ data: { goodreadsId }, location })));

export const deleteBookSuccess = (book, location) => dispatch => {
  return dispatch(makeActionCreator(DELETE_READ_BOOK_TYPE, 'SUCCESS', 'payload')({ data: book, location }));
};

export const deleteBookFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(DELETE_READ_BOOK_TYPE, 'FAILURE', 'payload')({ error, location }));



/* ===================== ADD_LIKE_BOOK ===================== */

export const addLike = (goodreadsId, location) => dispatch =>
  api.books
    .addLike(goodreadsId)
    .then(dispatch(makeActionCreator(ADD_LIKE_BOOK_TYPE, "REQUEST", 'payload')({ data: { goodreadsId }, location })));

export const addLikeSuccess = (book, location) => dispatch =>
  dispatch(makeActionCreator(ADD_LIKE_BOOK_TYPE, 'SUCCESS', 'payload')({ data: book, location }));

export const addLikeFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(ADD_LIKE_BOOK_TYPE, 'FAILURE', 'payload')({ error, location }));



/* ===================== DELETE_LIKE_BOOK ===================== */

export const deleteLike = (goodreadsId, location) => dispatch =>
  api.books
    .deleteLike(goodreadsId)
    .then(dispatch(makeActionCreator(DELETE_LIKE_BOOK_TYPE, 'REQUEST', 'payload')({ data: { goodreadsId }, location })));

export const deleteLikeSuccess = (book, location) => dispatch => {
  return dispatch(makeActionCreator(DELETE_LIKE_BOOK_TYPE, 'SUCCESS', 'payload')( { data: book, location }));
};

export const deleteLikeFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(DELETE_LIKE_BOOK_TYPE, 'FAILURE', 'payload')({ error, location }));



/* ===================== UPDATE_PROGRESS ===================== */

export const updateProgress = (num, goodreadsId, location) => dispatch =>
  api.books
    .updateProgress(num, goodreadsId)
    .then(dispatch(makeActionCreator(UPDATE_PROGRESS_TYPE, "REQUEST", 'payload')({ data: { goodreadsId }, location })));

export const updateProgressSuccess = (book, location) => dispatch =>
  dispatch(makeActionCreator(UPDATE_PROGRESS_TYPE, 'SUCCESS', 'payload')({ data: book, location }));

export const updateProgressFailure = (error, location) => dispatch =>
  dispatch(makeActionCreator(UPDATE_PROGRESS_TYPE, 'FAILURE', 'payload')({ error, location }));
