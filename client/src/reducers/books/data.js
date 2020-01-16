export default function data(state, action) {
  if (action.type === 'FETCH_TOP_DATA_SUCCESS') {
    return {
      data: { ...state.data, topBooks: action.data },
      loading: false,
      error: null
    }
  }

  if (action.type === 'FETCH_USER_BOOKS_DATA_SUCCESS') {
    return {
      data: { ...state.data, userBooks: action.data },
      loading: false,
      error: null
    }
  }

  if (action.type === 'FETCH_BOOK_DATA_SUCCESS') {
    return {
      data: { ...state.data, book: { data: action.data, severalBooks: [] } },
      loading: false,
      error: null
    }
  }

  /* --------------------------------------------------- */

  if (action.type.endsWith('_REQUEST')) {
    return { ...state, loading: true, error: null };
  }

  if (action.type.endsWith('_FAILURE')) {
    return { ...state, loading: false, error: action.error.response.data.errors.global };
  }
}
