import { FETCH_TOP_BOOK_DATA_TYPE, FETCH_BOOK_DATA_TYPE, FETCH_USER_BOOKS_DATA_TYPE } from "../../types";

export default function data(state, action) {
  const findSubString = str => action.type.includes(str);

  if (action.type.endsWith("_REQUEST")) {
    return {
      ...state,
      loading: true,
      error: { data: null, operations: null }
    };
  }

  if (action.type.endsWith("_SUCCESS")) {
    let data;
    switch (true) {
      case findSubString(FETCH_TOP_BOOK_DATA_TYPE):
        data = { ...state.data, topBooks: action.data };
        break;
      case findSubString(FETCH_USER_BOOKS_DATA_TYPE):
        data = { ...state.data, userBooks: action.data };
        break;
      case findSubString(FETCH_BOOK_DATA_TYPE):
        data = {
          ...state.data,
          book: { data: action.data, severalBooks: [] }
        };
        break;
      default:
        data = state;
    }
    return {
      data,
      loading: false,
      error: { data: null, operations: null }
    }
  }

  if (action.type.endsWith("_FAILURE")) {
    return {
      ...state,
      loading: false,
      error: {
        data: action.error.response.data.errors.global,
        operations: null
      }
    };
  }
}
