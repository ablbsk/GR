import { createSelector } from "reselect";
import {
  FETCH_TOP_TYPE,
  FETCH_BOOK_DATA_TYPE,
  FETCH_USER_BOOKS_TYPE,
  SEARCH_BOOKS_BY_PAGE_TYPE,

  ADD_BOOK,
  DELETE_BOOK_ON_BOOK_PAGE,
  ADD_BOOK_IN_LIST,
  ADD_LIKE,
  UPDATE_PROGRESS,
  DELETE_BOOK_ON_DASHBOARD_PAGE,
  DELETE_BOOK_ON_HOME_PAGE,
  DELETE_LIKE_ON_BOOK_PAGE,
  ADD_LIKE_IN_LIST,
  UPDATE_PROGRESS_IN_LIST,
  CHANGE_FILTERS,
  DELETE_LIKE_ON_HOME_PAGE,
  DELETE_LIKE_ON_DASHBOARD_PAGE,
} from "../types";

const createActionType = (actionName, suffix) => `${actionName}_${suffix}`;

const FETCH_TOP_SUCCESS = createActionType(FETCH_TOP_TYPE, 'SUCCESS');
const FETCH_BOOK_DATA_SUCCESS = createActionType(FETCH_BOOK_DATA_TYPE, 'SUCCESS');
const FETCH_USER_BOOKS_SUCCESS = createActionType(FETCH_USER_BOOKS_TYPE, 'SUCCESS');
const SEARCH_BOOKS_BY_PAGE_SUCCESS = createActionType(SEARCH_BOOKS_BY_PAGE_TYPE, 'SUCCESS');

const initialState = {
  loading: false,
  error: null,
  data: {},
  filter: 'all'
};

export default function books(state = initialState, action = {}) {

  if (action.type.endsWith('_REQUEST')) {
    return { ...state, loading: true, error: null };
  }

  if (action.type.endsWith('_FAILURE')) {
    return { ...state, data: action.data, loading: false, error: null };
  }

  switch (action.type) {
    case ADD_LIKE:
    case ADD_BOOK:
    case DELETE_LIKE_ON_BOOK_PAGE:
    case DELETE_BOOK_ON_BOOK_PAGE:
    case UPDATE_PROGRESS:
      return { ...state, data: { ...state.data, ...action.data } };

    case ADD_BOOK_IN_LIST:
    case DELETE_BOOK_ON_HOME_PAGE:
      return {
        ...state,
        data: state.data.map(item =>
          item.goodreadsId === action.data.goodreadsId
            ? { ...item, ...action.data }
            : item
        ),
      };

    case ADD_LIKE_IN_LIST:
    case DELETE_LIKE_ON_HOME_PAGE:
      return {
        ...state,
        data: state.data.map(item =>
          item.goodreadsId === action.data.goodreadsId
            ? { ...item, ...action.data }
            : item
        ),
        loading: false,
        error: null
      };
    case DELETE_LIKE_ON_DASHBOARD_PAGE:
      const k = state.data.findIndex(item => item.goodreadsId === action.data.goodreadsId);
      if (state.data[k].readStatus === true) {
        return {
          ...state,
          data: state.data.map((item, j) =>
            k === j
              ? { ...item, ...action.data }
              : item
          )
        }
      }
      return {
        ...state,
        data: { ...state.data.slice(0, k), ...state.data.slice(k + 1) },
        loading: false,
        error: null
      };
    case DELETE_BOOK_ON_DASHBOARD_PAGE:
      const i = state.data.findIndex(item => item.goodreadsId === action.data.goodreadsId);
      if (state.data[i].likeStatus === true) {
        return {
          ...state,
          data: state.data.map((item, j) =>
            i === j
              ? { ...item, ...action.data }
              : item
          )
        }
      }
      return {
        ...state,
        data: { ...state.data.slice(0, i), ...state.data.slice(i + 1) },
        loading: false,
        error: null
      };
    case UPDATE_PROGRESS_IN_LIST:
      return {
        ...state,
        data: state.data.map(item =>
          item.goodreadsId === action.data.goodreadsId
            ? { ...item, readPages: action.data.readPages }
            : item
        ),
        loading: false,
        error: null
      };

    case FETCH_TOP_SUCCESS:
    case FETCH_BOOK_DATA_SUCCESS:
    case FETCH_USER_BOOKS_SUCCESS:
    case SEARCH_BOOKS_BY_PAGE_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null
      };

    case CHANGE_FILTERS:
      return {
        ...state,
        filter: action.filter
      };

    default:
      return state;
  }
}

// SELECTORS

export const booksSelector = state => state.books.data;

export const allBooksSelector = createSelector(
  booksSelector,
  booksHash => Object.values(booksHash)
);
