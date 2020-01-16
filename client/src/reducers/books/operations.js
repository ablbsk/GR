export default function operations(state, action) {
  const { topBooks, userBooks, book } = state.data;

  if (action.type.endsWith('REQUEST')) {
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

  if (action.type.endsWith('SUCCESS')) {
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

  if (action.type.endsWith('FAILURE')) {
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
}
