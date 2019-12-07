import React from "react";
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
  deleteLikeFailure
} from "../../../actions/books";

import * as S from "./style";
import addBook from "../../../img/bookmark_empty.png";
import removeBook from "../../../img/bookmark_full.png";
import likeFull from "../../../img/like_full.png";
import likeEmpty from "../../../img/like_empty.png";

const AddLikeBookWidget = (props) => {
  const submitBook = e => {
    e.preventDefault();
    const { goodreadsId, readStatus } = props.book;
    if (readStatus) {
      const result = props.deleteBook(goodreadsId);
      viewMsg(result, props.page, props.deleteBookSuccess, props.deleteBookFailure);
    } else {
      const result = props.readBook(goodreadsId);
      viewMsg(result, props.page, props.readBookSuccess, props.readBookFailure);
    }
  };

  const submitLike = e => {
    e.preventDefault();
    const { goodreadsId, likeStatus } = props.book;
    if (likeStatus) {
      const result = props.deleteLike(goodreadsId);
      viewMsg(result, props.page, props.deleteLikeSuccess, props.deleteLikeFailure);
    } else {
      const result = props.addLike(goodreadsId);
      viewMsg(result, props.page, props.addLikeSuccess, props.addLikeFailure);
    }
  };

  const viewMsg = (result, page, success, failure) => {
    result
      .then(book => {
        success(book, page);
        toastr.success("Successful", "Changes installed successfully")
    })
      .catch(error => {
        failure(error);
        toastr.error("Server Error", error.response.data.errors.global)
      });
  };

  const altTitle = "You are limited to this features";
  const icons = (
    <>
      <span>
        <S.Icon src={addBook} title={altTitle} />
        <span>{props.book.numberOfEntities}</span>
      </span>
      <span>
        <S.Icon src={likeEmpty} title={altTitle} />
        <span>{props.book.likeCounter}</span>
      </span>
    </>
  );
  const buttons = (
    <>
        {props.book.readStatus
          ? <S.IconBtn src={removeBook} onClick={submitBook} title="Delete book from your collection" />
          : <S.IconBtn src={addBook} onClick={submitBook} title="Add book in your collection" />}
        <span>{props.book.numberOfEntities}</span>
        {props.book.likeStatus
          ? <S.IconBtn src={likeFull} onClick={submitLike} title="Delete like for this book" />
          : <S.IconBtn src={likeEmpty} onClick={submitLike} title="Add like for this book" />}
        <span>{props.book.likeCounter}</span>

    </>
  );
  return props.isAuthenticated && props.isConfirmed ? buttons : icons;
};

function mapStateToProps(state) {
  return {
    loading: state.books.loading
  };
}

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
    deleteLikeFailure
  }
)(AddLikeBookWidget);
