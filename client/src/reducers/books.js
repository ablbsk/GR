import { SORTING_BOOKS_TYPE, CHANGE_FILTERS_TYPE, DELETE_BOOK_TYPE, DELETE_LIKE_TYPE } from "../types";

const createActionType = (type, suffix) => `${type}_${suffix}`;

const CHANGE_FILTERS = createActionType(CHANGE_FILTERS_TYPE, '');

const SORTING_BOOKS = createActionType(SORTING_BOOKS_TYPE, '');

const DELETE_BOOK_FEATURE_ON_DASHBOARD_PAGE_SUCCESS = createActionType(DELETE_BOOK_TYPE, 'ON_DASHBOARD_PAGE_SUCCESS');

const DELETE_LIKE_FEATURE_ON_DASHBOARD_PAGE_SUCCESS = createActionType(DELETE_LIKE_TYPE, 'ON_DASHBOARD_PAGE_SUCCESS');


const initialState = {
  loading: false,
  error: null,
  data: {},
  filter: 'all'
};

export default function books(state = initialState, action = {}) {

  if (action.type.endsWith('_FEATURE_REQUEST')) {
    return {
      ...state,
      data: state.data.map(item => {
        return item.goodreadsId === action.data.goodreadsId
          ? { ...item, options: { whatLoading: action.data.whatLoading, error: null } }
          : item
      }),
      loading: false,
      error: null
    }
  }

  if (action.type.endsWith("_FEATURE_SUCCESS")) {
    return {
      ...state,
      data: state.data.map(item => {
        return item.goodreadsId === action.data.goodreadsId
          ? {
              ...item,
              ...action.data,
              options: { whatLoading: null, error: null }
            }
          : item;
      }),
      loading: false,
      error: null
    };
  }

  if (action.type.endsWith("_FEATURE_FAILURE")) {
    return {
      ...state,
      data: state.data.map(item => {
        return item.goodreadsId === action.goodreadsId
          ? {
              ...item,
              options: {
                whatLoading: null,
                error: action.error.response.data.errors.global
              }
            }
          : item;
      }),
      loading: false,
      error: null
    };
  }

  if (action.type.endsWith('_REQUEST')) {
    return { ...state, loading: true, error: null };
  }

  if (!action.type.includes('_ON_DASHBOARD_PAGE_SUCCESS') && action.type.endsWith('_SUCCESS')) {
    return { ...state, data: action.data, loading: false, error: null };
  }

  if (action.type.endsWith('_FAILURE')) {
    return { ...state, loading: false, error: action.error.response.data.errors.global };
  }

  switch (action.type) {
    case DELETE_LIKE_FEATURE_ON_DASHBOARD_PAGE_SUCCESS:
      const k = state.data.findIndex(item => item.goodreadsId === action.data.goodreadsId);
      if (state.data[k].readStatus) {
        return {
          ...state,
          data: state.data.map((item, j) =>
            k === j
              ? { ...item, ...action.data, options: { whatLoading: null, error: null } }
              : item
          ),
          loading: false,
          error: null
        }
      }

      const newDataWithLike = [...state.data.slice(0, k), ...state.data.slice(k + 1)];
      return {
        ...state,
        data: newDataWithLike.map(item => ({ ...item, options: { whatLoading: null, error: null }})),
        loading: false,
        error: null
      };

    case DELETE_BOOK_FEATURE_ON_DASHBOARD_PAGE_SUCCESS:
      const i = state.data.findIndex(item => item.goodreadsId === action.data.goodreadsId);
      if (state.data[i].likeStatus) {
        return {
          ...state,
          data: state.data.map((item, j) =>
            i === j
              ? { ...item, ...action.data, options: { whatLoading: null, error: null } }
              : item
          ),
          loading: false,
          error: null
        }
      }

      const newDataWithBook = [...state.data.slice(0, i), ...state.data.slice(i + 1)];
      return {
        ...state,
        data: newDataWithBook.map(item => ({ ...item, options: { whatLoading: null, error: null }})),
        loading: false,
        error: null
      };

    case CHANGE_FILTERS:
      return { ...state, filter: action.filter };

    case SORTING_BOOKS:
      return {
        ...state,
        data: [...state.data].sort(compareValues(action.data.key, action.data.order)),
        loading: false,
        error: null
      };

    default:
      return state;
  }
}

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}
