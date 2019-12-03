import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { deleteBookOnBookPage, deleteBookOnDashboardPage, deleteBookOnHomePage } from "../../../actions/books";

import * as S from './style';
import removeBook from "../../../img/bookmark_full.png";

const DeleteButton = (props) => {
  const onSubmit = e => {
    e.preventDefault();
    const {
      goodreadsId,
      page,
      deleteBookOnBookPage,
      deleteBookOnDashboardPage,
      deleteBookOnHomePage
    } = props;
    let result;

    switch (page) {
      case 'home':
        result = deleteBookOnHomePage(goodreadsId);
        break;
      case 'dashboard':
        result = deleteBookOnDashboardPage(goodreadsId);
        break;
      case 'book':
        result = deleteBookOnBookPage(goodreadsId);
        break;
    }
    result
      .then(() => toastr.success("Successful", "Changes installed successfully"))
      .catch(error => toastr.error("Server Error", error.response.data.error));
  };

  return (
    <S.removeBookIcon
      src={removeBook}
      onClick={onSubmit}
      title="Delete book in your collection"
    />
  );
};

DeleteButton.propTypes = {
  goodreadsId: PropTypes.string.isRequired,
  deleteBookOnBookPage: PropTypes.func.isRequired,
  deleteBookOnDashboardPage: PropTypes.func.isRequired,
  deleteBookOnHomePage: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteBookOnBookPage, deleteBookOnDashboardPage, deleteBookOnHomePage }
)(DeleteButton);
