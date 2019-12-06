import React from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import {
  readBook,
  readBookInList,
  deleteBookOnBookPage,
  deleteBookOnDashboardPage,
  deleteBookOnHomePage,
  addLike,
  addLikeInList,
  deleteLikeOnBookPage,
  deleteLikeOnHomePage,
  deleteLikeOnDashboardPage
} from "../../../actions/books";

import * as S from "./style";
import addBook from "../../../img/bookmark_empty.png";
import removeBook from "../../../img/bookmark_full.png";
import likeFull from "../../../img/like_full.png";
import likeEmpty from "../../../img/like_empty.png";

const AddLikeBookWidget = (props) => {
  const submitRead = e => {
    e.preventDefault();
    const { page, book, readBook, readBookInList } = props;
    (page === "book"
      ? readBook(book.goodreadsId)
      : readBookInList(book.goodreadsId)
    )
      .then(() =>
        toastr.success("Successful", "Changes installed successfully")
      )
      .catch(error => toastr.error("Server Error", error.response.data.error));
  };

  const submitDelete = e => {
    e.preventDefault();
    let result;
    const { page, book, deleteBookOnHomePage, deleteBookOnDashboardPage, deleteBookOnBookPage } = props;

    switch (page) {
      case "home":
        result = deleteBookOnHomePage(book.goodreadsId);
        break;
      case "dashboard":
        result = deleteBookOnDashboardPage(book.goodreadsId);
        break;
      case "book":
        result = deleteBookOnBookPage(book.goodreadsId);
        break;
    }
    result
      .then(() =>
        toastr.success("Successful", "Changes installed successfully")
      )
      .catch(error => toastr.error("Server Error", error.response.data.error));
  };

  const submitLike = e => {
    e.preventDefault();
    let result;
    const { page, book, addLike, addLikeInList, deleteLikeOnHomePage, deleteLikeOnDashboardPage, deleteLikeOnBookPage } = props;

    if (!book.likeStatus) {
      result = (page === "book")
          ? addLike(book.goodreadsId)
          : addLikeInList(book.goodreadsId);
    } else {
      switch (page) {
        case "home":
          result = deleteLikeOnHomePage(book.goodreadsId);
          break;
        case "dashboard":
          result = deleteLikeOnDashboardPage(book.goodreadsId);
          break;
        case "book":
          result = deleteLikeOnBookPage(book.goodreadsId);
          break;
      }
    }
    result
      .then(() =>
        toastr.success("Successful", "Changes installed successfully")
      )
      .catch(error => toastr.error("Server Error", error.response.data.error));
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
      <span>
        {props.book.readStatus
          ? <S.IconBtn src={removeBook} onClick={submitDelete} title="Delete book from your collection" />
          : <S.IconBtn src={addBook} onClick={submitRead} title="Add book in your collection" />}
        <span>{props.book.numberOfEntities}</span>
      </span>
      <span>
        {props.book.likeStatus
          ? <S.IconBtn src={likeFull} onClick={submitLike} title="Delete like for this book" />
          : <S.IconBtn src={likeEmpty} onClick={submitLike} title="Add like for this book" />}
        <span>{props.book.likeCounter}</span>
      </span>
    </>
  );
  return props.isAuthenticated && props.isConfirmed ? buttons : icons;
};

export default connect(
  null,
  {
    readBook,
    readBookInList,
    deleteBookOnBookPage,
    deleteBookOnDashboardPage,
    deleteBookOnHomePage,
    addLike,
    addLikeInList,
    deleteLikeOnBookPage,
    deleteLikeOnHomePage,
    deleteLikeOnDashboardPage
  }
)(AddLikeBookWidget);
