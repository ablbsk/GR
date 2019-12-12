import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import {
  readBook,
  readBookSuccess,
  readBookFailure,

  deleteBook,
  deleteBookSuccess,
  deleteBookFailure,

  addLike,
  addLikeSuccess,
  addLikeFailure,

  deleteLike,
  deleteLikeSuccess,
  deleteLikeFailure,

  updateProgress,
  updateProgressSuccess,
  updateProgressFailure
} from "../actions/books";

import ReadAndLikeButtons from "../components/buttons/read-and-like-buttons/read-and-like-buttons";
import ProgressButton from "../components/buttons/progress-button/progress-button";

class BookFeatures extends Component {
  state = {
    visibilityProgress: false
  };

  saveProgressClick = e => {
    e.preventDefault();
    const { onDashboardPage, updateProgress, updateProgressSuccess, updateProgressFailure } = this.props;
    const { pages, goodreadsId } = this.props.book;
    const readPages = parseInt(this.state.readPages);

    if ( isNaN(readPages) || readPages < 0 || readPages > pages ) {
      toastr.error('Error', "Invalid value");
      return
    } else {
      this.viewMsg(updateProgress(readPages, goodreadsId), onDashboardPage, updateProgressSuccess, updateProgressFailure, true)
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  changeVisibility = () => this.setState({ visibilityProgress: true });

  submitBook = e => {
    e.preventDefault();
    const { goodreadsId, readStatus } = this.props.book;
    const { onDashboardPage } = this.props;
    if (readStatus) {
      const { deleteBook, deleteBookSuccess, deleteBookFailure } = this.props;
      this.viewMsg(deleteBook(goodreadsId), onDashboardPage, deleteBookSuccess, deleteBookFailure);
    } else {
      const { readBook, readBookSuccess, readBookFailure } = this.props;
      this.viewMsg(readBook(goodreadsId), onDashboardPage, readBookSuccess, readBookFailure);
    }
  };

  submitLike = e => {
    e.preventDefault();
    const { goodreadsId, likeStatus } = this.props.book;
    const { onDashboardPage } = this.props;
    if (likeStatus) {
      const { deleteLike, deleteLikeSuccess, deleteLikeFailure } = this.props;
      this.viewMsg(deleteLike(goodreadsId), onDashboardPage, deleteLikeSuccess, deleteLikeFailure);
    } else {
      const { addLike, addLikeSuccess, addLikeFailure } = this.props;
      this.viewMsg(addLike(goodreadsId), onDashboardPage, addLikeSuccess, addLikeFailure);
    }
  };

  viewMsg = (result, page, success, failure, progress = false) => {
    result
      .then(book => {
        if (progress) {
          this.setState({ visibilityProgress: false });
        }
        success(book, page);
        toastr.success("Successful", "Changes installed successfully");
      })
      .catch(error => {
        failure(error);
        toastr.error("Server Error", error.response.data.errors.global);
      });
  };

  render() {
    const { book, isAuthenticated, isConfirmed, viewProgress } = this.props;
    const { whatLoading } = book.options;
    const { visibilityProgress } = this.state;

    const buttons = <ReadAndLikeButtons
      submitBook={this.submitBook}
      submitLike={this.submitLike}
      whatLoading={whatLoading}
      showBtn={isAuthenticated && isConfirmed}
      numberOfEntities={book.numberOfEntities}
      likeCounter={book.likeCounter}
      readStatus={book.readStatus}
      likeStatus={book.likeStatus}
    />;

    const progress = book.readStatus && viewProgress
      ? <ProgressButton
        submit={this.saveProgressClick}
        onChange={this.onChange}
        changeVisibility={this.changeVisibility}
        pages={book.pages}
        readPages={book.readPages}
        visibilityProgress={visibilityProgress}
        loading={whatLoading === 'progress'}
      />
      : null;

    return (
      <>
        {buttons}
        {progress}
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    isConfirmed: state.user.confirmed
  };
}

BookFeatures.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.string,
    average_rating: PropTypes.number,
    description: PropTypes.string,
    format: PropTypes.string,
    likeStatus: PropTypes.bool.isRequired,
    goodreadsId: PropTypes.string,
    pages: PropTypes.string,
    publication_day: PropTypes.string,
    publication_month: PropTypes.string,
    publication_year: PropTypes.string,
    publisher: PropTypes.string,
    readPages: PropTypes.number,
    readStatus: PropTypes.bool.isRequired,
    image_url: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  readBook: PropTypes.func.isRequired,
  readBookSuccess: PropTypes.func.isRequired,
  readBookFailure: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  deleteBookSuccess: PropTypes.func.isRequired,
  deleteBookFailure: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  addLikeSuccess: PropTypes.func.isRequired,
  addLikeFailure: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  deleteLikeSuccess: PropTypes.func.isRequired,
  deleteLikeFailure: PropTypes.func.isRequired,
  updateProgress: PropTypes.func.isRequired,
  updateProgressSuccess: PropTypes.func.isRequired,
  updateProgressFailure: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    readBook,
    readBookSuccess,
    readBookFailure,

    deleteBook,
    deleteBookSuccess,
    deleteBookFailure,

    addLike,
    addLikeSuccess,
    addLikeFailure,

    deleteLike,
    deleteLikeSuccess,
    deleteLikeFailure,

    updateProgress,
    updateProgressSuccess,
    updateProgressFailure
  }
)(BookFeatures);
