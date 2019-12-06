import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getBookData,
  getBookDataSuccess,
  getBookDataFailure
} from "../../actions/books";

import ConfirmEmailMessage from "../../components/messages/confirm-email-message";
import BookContent from "../../components/contents/book-content/book-content";
import CenterLoading from "../../components/loaders/center-loader/center-loader";
import PageError from "../../components/errors/page-error/page-error";

class BookPage extends Component {
  componentDidMount() {
    this.fetchBook();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    const prevId = prevProps.match.params.id;
    if (id !== prevId) {
      this.fetchBook();
    }
  }

  fetchBook = () => {
    const { id } = this.props.match.params;
    const { getBookData, getBookDataSuccess, getBookDataFailure } = this.props;

    getBookData(id)
      .then(book => getBookDataSuccess(book))
      .catch(error => getBookDataFailure(error));
  };

  render() {
    const { isAuthenticated, book, loading, error, isConfirmed } = this.props;

    if (loading) {
      return <CenterLoading />;
    }

    if (error) {
      return <PageError title={error} />;
    }

    return (
      <>
        {!isConfirmed && <ConfirmEmailMessage />}
        <BookContent
          isAuthenticated={isAuthenticated}
          book={book}
          isConfirmed={isConfirmed}
        />
      </>
    );
  }
}

BookPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    average_rating: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    likeStatus: PropTypes.bool.isRequired,
    goodreadsId: PropTypes.string.isRequired,
    pages: PropTypes.string.isRequired,
    publication_day: PropTypes.string.isRequired,
    publication_month: PropTypes.string.isRequired,
    publication_year: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    readPages: PropTypes.number.isRequired,
    readStatus: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  error: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  getBookData: PropTypes.func.isRequired,
  getBookDataSuccess: PropTypes.func.isRequired,
  getBookDataFailure: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    book: state.books.data,
    loading: state.books.loading,
    error: state.books.error,
    isConfirmed: state.user.confirmed
  };
}

export default connect(
  mapStateToProps,
  { getBookData, getBookDataSuccess, getBookDataFailure }
)(BookPage);
