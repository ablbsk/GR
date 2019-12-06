import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { allBooksSelector } from "../../reducers/books";
import {
  getUserBooks,
  getUserBooksSuccess,
  getUserBooksFailure,
  changeFilters
} from "../../actions/books";

import ConfirmEmailMessage from "../../components/messages/confirm-email-message";
import UserBooksList from "../../components/lists/user-books-list/user-books-list";
import CenterLoading from "../../components/loaders/center-loader/center-loader";

import * as S from "../../components/contents/dashboard-content/style";
import DashboardContent from "../../components/contents/dashboard-content/dashboard-content";

class DashboardPage extends Component {
  componentDidMount() {
    const {
      getUserBooks,
      getUserBooksSuccess,
      getUserBooksFailure
    } = this.props;
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
    const { isAuthenticated, isConfirmed } = this.props;
    if (books.length === 0) {
      return <S.NoBooks>You don't have books</S.NoBooks>;
    } else {
      return filterBooks.length === 0
        ? <S.NoBooks>No books</S.NoBooks>
        : <UserBooksList isConfirmed={isConfirmed} isAuthenticated={isAuthenticated} books={filterBooks} />
    }
  };

  render() {
    const { isConfirmed, books, loading, filter, changeFilters } = this.props;
    const filtersBtn = [
      { text: 'All', id: 'all' },
      { text: 'Read', id: 'read', },
      { text: 'Like', id: 'like' }
    ];
    const filterBooks = this.filterBooks(books, filter);
    const content = this.showContent(books, filterBooks);

    if (loading) {
      return <CenterLoading />;
    }

    return (
      <>
        {!isConfirmed && <ConfirmEmailMessage />}
        <DashboardContent
          booksLength={books.length}
          content={content}
          filtersBtn={filtersBtn}
          changeFilters={changeFilters}
        />
      </>
    );
  }
}

DashboardPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      goodreadsId: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      likeStatus: PropTypes.bool.isRequired,
      pages: PropTypes.number.isRequired,
      readPages: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      _id: PropTypes.string
    }).isRequired
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getUserBooks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    books: allBooksSelector(state),
    loading: state.books.loading,
    error: state.books.error,
    filter: state.books.filter,
    isConfirmed: !!state.user.confirmed
  };
}

export default connect(
  mapStateToProps,
  { getUserBooks, getUserBooksSuccess, getUserBooksFailure, changeFilters }
)(DashboardPage);
