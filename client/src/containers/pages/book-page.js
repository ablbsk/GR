import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBookData, getBookDataSuccess, getBookDataFailure } from "../../actions/books/data";

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
    const goodreadsId = this.props.match.params.id;
    const { getBookData, getBookDataSuccess, getBookDataFailure } = this.props;

    getBookData(goodreadsId)
      .then(book => getBookDataSuccess(book))
      .catch(error => getBookDataFailure(error));
  };

  render() {
    const { isAuthenticated, book, loading, error, isConfirmed } = this.props;
    const location = 'book';

    if (loading || Object.entries(book).length === 0) {
      return <CenterLoading />;
    }

    if (error) {
      return <PageError title={error} />;
    }

    return (
      <>
        {isAuthenticated && !isConfirmed && <ConfirmEmailMessage />}
        <BookContent book={book} location={location} />
      </>
    );
  }
}

BookPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    average_rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    format: PropTypes.string,
    likeStatus: PropTypes.bool,
    goodreadsId: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
    publication_day: PropTypes.number,
    publication_month: PropTypes.number,
    publication_year: PropTypes.number,
    publisher: PropTypes.string,
    readPages: PropTypes.number,
    readStatus: PropTypes.bool,
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    options: PropTypes.shape({
      whatLoading: PropTypes.string,
      error: PropTypes.string
    }).isRequired,
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
  const { content, user } = state;
  return {
    isAuthenticated: !!user.email,
    isConfirmed: user.confirmed,
    book: content.books.data.book.data,
    loading: content.books.loading,
    error: content.books.error.data
  };
}

export default connect(
  mapStateToProps,
  { getBookData, getBookDataSuccess, getBookDataFailure }
)(BookPage);
