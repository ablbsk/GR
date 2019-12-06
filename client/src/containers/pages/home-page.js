import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTop, getTopSuccess, getTopFailure } from "../../actions/books";
import { allBooksSelector } from "../../reducers/books";

import ConfirmEmailMessage from "../../components/messages/confirm-email-message";
import TopBooksList from "../../components/lists/top-books-list/top-books-list";
import CenterLoading from "../../components/loaders/center-loader/center-loader";
import PageError from "../../components/errors/page-error/page-error";

class HomePage extends Component {
  componentDidMount() {
    const { getTop, getTopSuccess, getTopFailure } = this.props;
    getTop()
      .then(books => getTopSuccess(books))
      .catch(error => getTopFailure(error));
  }

  render() {
    const { isAuthenticated, isConfirmed, books, loading, error } = this.props;

    if (loading) {
      return <CenterLoading />;
    }

    if (error) {
      return <PageError title={error} />;
    }

    return (
      <>
        {!isConfirmed && <ConfirmEmailMessage />}
        <TopBooksList
          topLikes={true}
          books={books.slice(0, 2)}
          isAuthenticated={isAuthenticated}
          isConfirmed={isConfirmed}
        />
        <TopBooksList
          topLikes={false}
          books={books.slice(2)}
          isAuthenticated={isAuthenticated}
          isConfirmed={isConfirmed}
        />
      </>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        authors: PropTypes.string.isRequired,
        average_rating: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        goodreadsId: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        likeCounter: PropTypes.number.isRequired,
        numberOfEntities: PropTypes.number.isRequired,
        _id: PropTypes.string
      }).isRequired
    ).isRequired
  ).isRequired,
  getTop: PropTypes.func.isRequired,
  getTopSuccess: PropTypes.func.isRequired,
  getTopFailure: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  error: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    books: allBooksSelector(state),
    loading: state.books.loading,
    error: state.books.error,
    isConfirmed: state.user.confirmed
  };
}

export default connect(
  mapStateToProps,
  { getTop, getTopSuccess, getTopFailure }
)(HomePage);
