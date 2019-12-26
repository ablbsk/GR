import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTop, getTopSuccess, getTopFailure } from "../../actions/books";

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

    if (loading || books === undefined) {
      return <CenterLoading />;
    }

    if (error || !Array.isArray(books)) {
      return <PageError title={error || "Something went wrong..."} />;
    }

    return (
      <>
        {isAuthenticated && !isConfirmed && <ConfirmEmailMessage />}
        <TopBooksList topLikes={true} books={books.slice(0, 2)} />
        <TopBooksList topLikes={false} books={books.slice(2)} />
      </>
    );
  }
}

HomePage.propTypes = {
  books: PropTypes.arrayOf(
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
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isConfirmed: PropTypes.bool,
  error: PropTypes.bool,

  getTop: PropTypes.func.isRequired,
  getTopSuccess: PropTypes.func.isRequired,
  getTopFailure: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    books: state.books.data,
    loading: state.books.loading,
    error: state.books.error,
    isConfirmed: state.user.confirmed
  };
}

export default connect(
  mapStateToProps,
  { getTop, getTopSuccess, getTopFailure }
)(HomePage);
