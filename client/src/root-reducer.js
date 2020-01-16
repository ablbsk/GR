import { combineReducers } from "redux";
import { reducer as toastr } from "react-redux-toastr";

import user from "./reducers/user";
import books from "./reducers/books/index.js";

export default combineReducers({
  user,
  content: combineReducers({
    books
  }),
  toastr
});
