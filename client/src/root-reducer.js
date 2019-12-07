import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import user from './reducers/user';
import books from './reducers/books';

export default combineReducers({
  user,
  books,
  toastr: toastrReducer
});

/*
 state = {
  user,
  books: {
    content: {
      0: {
        ...data,
        func: {
          addBook: { loading, error },
          likeBook: { loading, error },
          updateProgress: { loading, error },
        }
      },
      1: {
        ...data,
        func: {
          addBook: { loading, error },
          likeBook: { loading, error },
          updateProgress: { loading, error },
        }
      }
    },
    loading,
    error
  }
 }
 */
