import { createSelector } from "reselect";
import {
  FETCH_TOP_TYPE,
  FETCH_BOOK_DATA_TYPE,
  FETCH_USER_BOOKS_TYPE,
  SEARCH_BOOKS_BY_PAGE_TYPE,
  CHANGE_FILTERS_TYPE,

  ADD_BOOK_TYPE,
  DELETE_BOOK_TYPE,

  ADD_LIKE_TYPE,
  DELETE_LIKE_TYPE,

  UPDATE_PROGRESS_TYPE
} from "../types";

const createActionType = (actionName, suffix) => `${actionName}_${suffix}`;

const FETCH_TOP_SUCCESS = createActionType(FETCH_TOP_TYPE, 'SUCCESS');
const FETCH_BOOK_DATA_SUCCESS = createActionType(FETCH_BOOK_DATA_TYPE, 'SUCCESS');
const FETCH_USER_BOOKS_SUCCESS = createActionType(FETCH_USER_BOOKS_TYPE, 'SUCCESS');
const SEARCH_BOOKS_BY_PAGE_SUCCESS = createActionType(SEARCH_BOOKS_BY_PAGE_TYPE, 'SUCCESS');
const CHANGE_FILTERS = createActionType(CHANGE_FILTERS_TYPE, '');

const ADD_BOOK_SUCCESS = createActionType(ADD_BOOK_TYPE, 'SUCCESS');
const ADD_BOOK_IN_LIST_SUCCESS = createActionType(ADD_BOOK_TYPE, 'IN_LIST_SUCCESS');

const DELETE_BOOK_ON_HOME_PAGE_SUCCESS = createActionType(DELETE_BOOK_TYPE, 'ON_HOME_PAGE_SUCCESS');
const DELETE_BOOK_ON_DASHBOARD_PAGE_SUCCESS = createActionType(DELETE_BOOK_TYPE, 'ON_DASHBOARD_PAGE_SUCCESS');
const DELETE_BOOK_ON_BOOK_PAGE_SUCCESS = createActionType(DELETE_BOOK_TYPE, 'ON_BOOK_PAGE_SUCCESS');

const ADD_LIKE_SUCCESS = createActionType(ADD_LIKE_TYPE, 'SUCCESS');
const ADD_LIKE_IN_LIST_SUCCESS = createActionType(ADD_LIKE_TYPE, 'IN_LIST_SUCCESS');

const DELETE_LIKE_ON_HOME_PAGE_SUCCESS = createActionType(DELETE_LIKE_TYPE, 'ON_HOME_PAGE_SUCCESS');
const DELETE_LIKE_ON_DASHBOARD_PAGE_SUCCESS = createActionType(DELETE_LIKE_TYPE, 'ON_DASHBOARD_PAGE_SUCCESS');
const DELETE_LIKE_ON_BOOK_PAGE_SUCCESS = createActionType(DELETE_LIKE_TYPE, 'ON_BOOK_PAGE_SUCCESS');

const UPDATE_PROGRESS_SUCCESS = createActionType(UPDATE_PROGRESS_TYPE, 'SUCCESS');
const UPDATE_PROGRESS_IN_LIST_SUCCESS = createActionType(UPDATE_PROGRESS_TYPE, 'IN_LIST_SUCCESS');

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
    return {
      ...state,
      loading: false,
      error: action.error.response.data.errors.global
    };
  }

  switch (action.type) {
    case ADD_LIKE_SUCCESS:
    case ADD_BOOK_SUCCESS:
    case DELETE_LIKE_ON_BOOK_PAGE_SUCCESS:
    case DELETE_BOOK_ON_BOOK_PAGE_SUCCESS:
    case UPDATE_PROGRESS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data
        },
        loading: false,
        error: null
      };

    case ADD_BOOK_IN_LIST_SUCCESS:
    case DELETE_BOOK_ON_HOME_PAGE_SUCCESS:
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

    case ADD_LIKE_IN_LIST_SUCCESS:
    case DELETE_LIKE_ON_HOME_PAGE_SUCCESS:
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
    case DELETE_LIKE_ON_DASHBOARD_PAGE_SUCCESS:
      const k = state.data.findIndex(item => item.goodreadsId === action.data.goodreadsId);
      if (state.data[k].readStatus === true) {
        return {
          ...state,
          data: state.data.map((item, j) =>
            k === j
              ? { ...item, ...action.data }
              : item
          ),
          loading: false,
          error: null
        }
      }
      return {
        ...state,
        data: { ...state.data.slice(0, k), ...state.data.slice(k + 1) },
        loading: false,
        error: null
      };
    case DELETE_BOOK_ON_DASHBOARD_PAGE_SUCCESS:
      const i = state.data.findIndex(item => item.goodreadsId === action.data.goodreadsId);
      if (state.data[i].likeStatus === true) {
        return {
          ...state,
          data: state.data.map((item, j) =>
            i === j
              ? { ...item, ...action.data }
              : item
          ),
          loading: false,
          error: null
        }
      }
      return {
        ...state,
        data: { ...state.data.slice(0, i), ...state.data.slice(i + 1) },
        loading: false,
        error: null
      };
    case UPDATE_PROGRESS_IN_LIST_SUCCESS:
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
      return { ...state, data: action.data, loading: false, error: null };

    case CHANGE_FILTERS:
      return { ...state, filter: action.filter };

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
