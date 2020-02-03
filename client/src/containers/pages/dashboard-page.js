import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserBooks, getUserBooksSuccess, getUserBooksFailure, changeFilters, sortingBooks } from "../../actions/books";

import DashboardContent from "../../components/contents/dashboard-content/dashboard-content";
import ConfirmEmailMessage from "../../components/messages/confirm-email-message";
import CenterLoading from "../../components/loaders/center-loader/center-loader";
import PageError from "../../components/errors/page-error/page-error";

class DashboardPage extends Component {
  componentDidMount() {
    const {getUserBooks, getUserBooksSuccess, getUserBooksFailure} = this.props;
    getUserBooks()
      .then(books => getUserBooksSuccess(books))
      .catch(error => getUserBooksFailure(error));
  }

  filterBooks = (books, filter) => {
    switch (filter) {
      case "read":
        return books.filter(book => book.readStatus);
      case "like":
        return books.filter(book => book.likeStatus);
      default:
        return books;
    }
  };

  showContent = (books, filterBooks) => {
    if (books.length === 0) {
      return "You don't have books";
    } else {
      return filterBooks.length === 0 ? "No books" : filterBooks;
    }
  };

  render() {
    const { isConfirmed, books, loading, filter, changeFilters, sortingBooks, error } = this.props;
    const filterBooks = this.filterBooks(books, filter);
    const content = this.showContent(books, filterBooks);
    const location = 'dashboard';

    if (loading || books === undefined) {
      return <CenterLoading />;
    }

    if (error && books.length === 0) {
      return <PageError title={error || "Something went wrong..."} />;
    }

    return (
      <>
        {!isConfirmed && <ConfirmEmailMessage />}
        <DashboardContent
          booksLength={books.length}
          books={content}
          changeFilters={changeFilters}
          sortingBooks={sortingBooks}
          location={location}
        />
      </>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      goodreadsId: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      likeStatus: PropTypes.bool.isRequired,
      likeCounter: PropTypes.number.isRequired,
      readStatus: PropTypes.bool.isRequired,
      numberOfEntities: PropTypes.number.isRequired,
      pages: PropTypes.number.isRequired,
      readPages: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      options: PropTypes.shape({
        error: PropTypes.string,
        whatLoading: PropTypes.string,
      }).isRequired,
      _id: PropTypes.string
    }).isRequired
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,

  getUserBooks: PropTypes.func.isRequired,
  getUserBooksSuccess: PropTypes.func.isRequired,
  getUserBooksFailure: PropTypes.func.isRequired,
  changeFilters: PropTypes.func.isRequired,
  sortingBooks: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { content, user } = state;
  return {
    isConfirmed: !!user.confirmed,
    books: content.books.data.userBooks,
    loading: content.books.loading,
    error: content.books.error.data,
    filter: content.books.filter,
  };
}

export default connect(
  mapStateToProps,
  { getUserBooks, getUserBooksSuccess, getUserBooksFailure, changeFilters, sortingBooks }
)(DashboardPage);
