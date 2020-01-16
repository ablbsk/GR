import { SORTING_BOOKS_TYPE, CHANGE_FILTERS_TYPE } from "../../types";
import operations from "./operations";
import data from "./data";

const createActionType = (type, suffix) => `${type}_${suffix}`;

const CHANGE_FILTERS = createActionType(CHANGE_FILTERS_TYPE, '');

const SORTING_BOOKS = createActionType(SORTING_BOOKS_TYPE, '');

const initialState = {
  data: {
    topBooks: {},
    userBooks: [],
    book: {
      data: {},
      severalBooks: []
    }
  },
  loading: false,
  error: null,
  filter: 'all'
};

export default function books(state = initialState, action = {}) {
  /* DATA (TYPES):
  *  FETCH_TOP_DATA_TYPE,
  *  FETCH_USER_BOOKS_TYPE
  *  FETCH_BOOK_DATA_TYPE
  * */

  if (action.type.includes('DATA')) {
    return data(state, action);
  }

  /* OPERATIONS (TYPES):
  *  ADD_BOOK_TYPE,
  *  DELETE_BOOK_TYPE
  *  ADD_LIKE_TYPE
  *  DELETE_LIKE_TYPE,
  *  UPDATE_PROGRESS_TYPE
  * */

  if (action.type.includes('OPERATIONS')) {
    return operations(state, action);
  }

  switch (action.type) {
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
    return order === "desc" ? comparison * -1 : comparison;
  };
}
