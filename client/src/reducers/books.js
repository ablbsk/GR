import { SORTING_BOOKS_TYPE, CHANGE_FILTERS_TYPE } from "../types";

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
  const { topBooks, userBooks, book } = state.data;

  if (action.type.endsWith('_FEATURE_REQUEST')) {
    const { data, location } = action.payload;

    const updateLoading = key => key.map(item => {
      return item.goodreadsId === data.goodreadsId
        ? { ...item, options: { whatLoading: data.whatLoading, error: null } }
        : item
    });

    switch (location) {
      case 'top':
        const updateTopBooks = {};

        for (let objKey in topBooks) {
          updateTopBooks[objKey] = updateLoading(topBooks[objKey]);
        }

        return {
          data: { ...state.data, topBooks: updateTopBooks },
          loading: false,
          error: null
        };

      case 'dashboard':
        const updateUserBooks = updateLoading(userBooks);
        return {
          data: { ...state.data, userBooks: updateUserBooks },
          loading: false,
          error: null
        };

      case 'book':
        return {
          data: {
            ...state.data,
            book: {
              ...book,
              data: {
                ...book.data,
                options: { whatLoading: data.whatLoading, error: null } }
            }
          },
          loading: false,
          error: null
        };
      default:
        return state;
    }
  }

  if (action.type.endsWith('_FEATURE_SUCCESS')) {
    const { data, location } = action.payload;

    const updateValue = key => key.map(item => {
      return item.goodreadsId === data.goodreadsId
        ? { ...item, ...data, options: { whatLoading: null, error: null } }
        : item;
    });

    switch (location) {
      case 'top':
        const updateTopBooks = {};

        for (let objKey in topBooks) {
          updateTopBooks[objKey] = updateValue(topBooks[objKey]);
        }

        return {
          ...state,
          data: { ...state.data, topBooks: updateTopBooks },
          loading: false,
          error: null
        };

      case 'dashboard':
        if (action.type.startsWith('DELETE')) {
          const type = !!action.type.includes('LIKE');
          const index = userBooks.findIndex(item => item.goodreadsId === data.goodreadsId);

          if ((type && userBooks[index].readStatus) || (!type && userBooks[index].likeStatus)) {
            const newUserBooks = userBooks.map((item, itemIndex) =>
                index === itemIndex
                  ? { ...item, ...data, options: { whatLoading: null, error: null } }
                  : item
              );

            return {
              ...state,
              data: { userBooks: newUserBooks, topBooks: { ...topBooks } },
              loading: false,
              error: null
            }
          }

          const updateUserBooks = [...userBooks.slice(0, index), ...userBooks.slice(index + 1)];
          const updateUserBooksWithOptions = updateUserBooks.map(item =>
              ({ ...item, options: { whatLoading: null, error: null }}));
          return {
            ...state,
            data: { userBooks: updateUserBooksWithOptions, topBooks },
            loading: false,
            error: null
          };
        } else {
          const updateUserBooks = updateValue(userBooks);
          return {
            ...state,
            data: { topBooks, userBooks: updateUserBooks },
            loading: false,
            error: null
          };
        }

      case 'book':
        return {
          data: {
            ...state.data,
            book: {
              ...book,
              data: {
                ...book.data,
                ...data,
                options: { whatLoading: null, error: null } }
            }
          },
          loading: false,
          error: null
        };
      default:
        return state;
    }
  }

  if (action.type.endsWith('_FEATURE_FAILURE')) { //TODO Нужен ли error в каждой книге?
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


  if (action.type === 'FETCH_TOP_SUCCESS') {
    return {
      data: { ...state.data, topBooks: action.data },
      loading: false,
      error: null
    }
  }

  if (action.type === 'FETCH_USER_BOOKS_SUCCESS') {
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
