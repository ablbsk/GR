import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import  { readBook, readBookInList } from "../../../actions/books";

import * as S from './style';
import addBook from "../../../img/bookmark_empty.png";

const ReadButton = ({ goodreadsId, readBook, readBookInList, page }) => {
  const onSubmit = e => {
    e.preventDefault();
    (page === 'book' ? readBook(goodreadsId) : readBookInList(goodreadsId))
      .then(() => toastr.success("Successful", "Changes installed successfully"))
      .catch(error => toastr.error("Server Error", error.response.data.error));
  };

  return <S.AddBookIcon src={addBook} onClick={onSubmit} title="Add book in your collection" />;
};

ReadButton.propTypes = {
  goodreadsId: PropTypes.string.isRequired,
  readBook: PropTypes.func.isRequired,
  readBookInList: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired
};

export default connect(
  null,
  { readBook, readBookInList }
)(ReadButton);
