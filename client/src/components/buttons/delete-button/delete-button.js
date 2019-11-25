import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { deleteBook, deleteBookInList } from "../../../actions/books";

import * as S from './style';
import removeBook from "../../../img/bookmark_full.png";

const DeleteButton = ({ id, deleteBook, deleteBookInList, inList }) => {
  const onSubmit = e => {
    e.preventDefault();
    (inList ? deleteBookInList(id) : deleteBook(id))
      .then(() =>
        toastr.success("Successful", "Changes installed successfully")
      )
      .catch(error => toastr.error("Server Error", error.response.data.error));
  };

  return <S.removeBookIcon src={removeBook} onClick={onSubmit} />;
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  deleteBook: PropTypes.func.isRequired,
  inList: PropTypes.bool.isRequired
};

export default connect(
  null,
  { deleteBook, deleteBookInList }
)(DeleteButton);
