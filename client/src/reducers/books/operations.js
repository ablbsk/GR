export default function operations(state, action) {
  const { topBooks, userBooks, book } = state.data;

  const determineType = type => type.toLowerCase().split("_")[1];

  const updateLoadingAccordingToLocation = (location, isNotSuccess, loadingValue) => {
    switch (location) {
      case 'top':
        const updateTopBooks = {};
        for (let objKey in topBooks) {
          updateTopBooks[objKey] = updateLoading(topBooks[objKey], isNotSuccess, loadingValue);
        }
        return { ...state.data, topBooks: updateTopBooks };
      case 'dashboard':
        const updateUserBooks = updateLoading(userBooks, isNotSuccess, loadingValue);
        return { ...state.data, userBooks: updateUserBooks };
      case 'book':
        const operation = determineType(action.type);
        return {
          ...state.data,
          book: {
            ...book,
            data: {
              ...book.data,
              loading: { ...book.data.loading, [operation]: loadingValue }
            }
          }
        };
      default:
        return state;
    }
  };

  const updateLoading = (key, isNotSuccess, value) => key.map(item => {
    const { data } = action.payload;
    const operation = determineType(action.type);
    const loading = { ...item.loading, [operation]: value };
    const itemWithUpdateLoading = { ...item, loading };

    if(action.type.endsWith("FAILURE")) {
      return item.loading[operation] ? itemWithUpdateLoading : item;
    } else if (item.goodreadsId === data.goodreadsId) {
      return isNotSuccess ? itemWithUpdateLoading : { ...item, ...data, loading };
    }
    return item
  });

  if (action.type.endsWith('REQUEST')) {
    const { location } = action.payload;
    const loadingValue = true;
    const isNotSuccess = true;
    const newData = updateLoadingAccordingToLocation(location, isNotSuccess, loadingValue);

    return {
      data: newData,
      loading: false,
      error: { data: null, operations: null }
    }
  }

  if (action.type.endsWith('SUCCESS')) {
    const { data, location } = action.payload;
    const loadingValue = false;
    const isNotSuccess = false;
    let newData;

    switch (location) {
      case 'top':
        const newTopBooks = {};
        for (let objKey in topBooks) {
          newTopBooks[objKey] = updateLoading(topBooks[objKey], isNotSuccess, loadingValue);
        }
        newData = { ...state.data, topBooks: newTopBooks };
        break;
      case 'dashboard':
        let newUserBooks;

        if (action.type.startsWith('DELETE')) {
          const type = !!action.type.includes('LIKE');
          const index = userBooks.findIndex(item => item.goodreadsId === data.goodreadsId);

          if ((type && userBooks[index].readStatus) || (!type && userBooks[index].likeStatus)) {
            newUserBooks = updateLoading(userBooks, isNotSuccess, loadingValue);
          } else {
            const filterUserBooks = [...userBooks.slice(0, index), ...userBooks.slice(index + 1)];
            newUserBooks = updateLoading(filterUserBooks, !isNotSuccess, loadingValue);
          }
        } else {
          newUserBooks = updateLoading(userBooks, isNotSuccess, loadingValue);
        }
        newData = { ...state.data, userBooks: newUserBooks };
      break;
      case 'book':
        const operation = determineType(action.type);
        newData = {
          ...state.data,
          book: {
            ...book,
            data: {
              ...book.data,
              ...data,
              loading: { ...book.data.loading, [operation]: loadingValue }
            }
          }
        };
        break;
      default:
        return state;
    }
    return {
      data: newData,
      loading: false,
      error: { data: null, operations: null }
    }
  }

  if (action.type.endsWith('FAILURE')) {
    const { location } = action.payload;
    const loadingValue = false;
    const isNotSuccess = true;
    const newData = updateLoadingAccordingToLocation(location, isNotSuccess, loadingValue);

    return {
      data: newData,
      loading: false,
      error: {
        data: null,
        operations: action.payload.error.response.data.errors.global
      }
    };
  }
}
