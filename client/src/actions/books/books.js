import api from "../../api";
import { makeActionCreator } from "../helper";
import {
  SEARCH_BOOKS_BY_PAGE_TYPE,
  CHANGE_FILTERS_TYPE,
  SORTING_BOOKS_TYPE,
} from "../../types";

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
