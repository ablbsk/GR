import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTop, getTopSuccess, getTopFailure } from "../../actions/books/data";

import ConfirmEmailMessage from "../../components/messages/confirm-email-message";
import TopBooksList from "../../components/lists/top-books-list/top-books-list";
import CenterLoading from "../../components/loaders/center-loader/center-loader";
import PageError from "../../components/errors/page-error/page-error";

class HomePage extends Component {
  componentDidMount() {
    const {getTop, getTopSuccess, getTopFailure} = this.props;
    getTop()
      .then(books => getTopSuccess(books))
      .catch(error => getTopFailure(error));
  }

  render() {
    const { isAuthenticated, isConfirmed, books, loading, error } = this.props;
    const location = 'top';

    if (loading) {
      return <CenterLoading />;
    }

    if (error) {
      return <PageError title={error || "Something went wrong..."} />;
    }

    return (
      <>
        {isAuthenticated && !isConfirmed && <ConfirmEmailMessage />}
        <TopBooksList
          topLikes={true}
          books={books.topLikeBooks}
          location={location}
        />
        <TopBooksList
          topLikes={false}
          books={books.topReadBooks}
          location={location}
        />
      </>
    );
  }
}

HomePage.propTypes = {
  books: PropTypes.shape({
    topLikeBooks: PropTypes.arrayOf({
      authors: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      goodreadsId: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      likeCounter: PropTypes.number.isRequired,
      numberOfEntities: PropTypes.number.isRequired,
      _id: PropTypes.string
    }).isRequired,
    topReadBooks: PropTypes.arrayOf({
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
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isConfirmed: PropTypes.bool,
  error: PropTypes.string,

  getTop: PropTypes.func.isRequired,
  getTopSuccess: PropTypes.func.isRequired,
  getTopFailure: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { content, user } = state;
  return {
    isAuthenticated: !!user.email,
    isConfirmed: user.confirmed,
    books: content.books.data.topBooks,
    loading: content.books.loading,
    error: content.books.error.data
  };
}

export default connect(
  mapStateToProps,
  { getTop, getTopSuccess, getTopFailure }
)(HomePage);
