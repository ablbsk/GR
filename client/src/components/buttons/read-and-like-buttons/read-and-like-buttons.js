import React from "react";
import PropTypes from "prop-types";

import ButtonLoading from "../../loaders/button-loading/button-loading";

import * as S from "./style";

import addBook from "../../../img/bookmark_empty.png";
import removeBook from "../../../img/bookmark_full.png";
import likeFull from "../../../img/like_full.png";
import likeEmpty from "../../../img/like_empty.png";

const ReadAndLikeButtons = (props) => {
  const createBtn = (src, onClick, title) => <S.IconBtn src={src} onClick={onClick} title={title} />;

  const altTitle = "You are limited to this feature";
  const icons = (
    <>
      <span>
        <S.Icon src={addBook} title={altTitle} />
        <span>{props.numberOfEntities}</span>
      </span>
      <span>
        <S.Icon src={likeEmpty} title={altTitle} />
        <span>{props.likeCounter}</span>
      </span>
    </>
  );

  const like = (
    <>
      {props.likeStatus
        ? createBtn(likeFull, props.submitLike, "Delete like for this book")
        : createBtn(likeEmpty, props.submitLike, "Add like for this book")}
    </>
  );

  const read = (
    <>
      {props.readStatus
        ? createBtn(removeBook, props.submitBook, "Delete book from your collection")
        : createBtn(addBook, props.submitBook, "Add book to your collection")}
    </>
  );

  const buttons = (
    <>
      {props.loading.read ? <ButtonLoading /> : read}
      <S.Count status={props.readStatus}>{props.numberOfEntities}</S.Count>
      {props.loading.like ? <ButtonLoading /> : like}
      <S.Count status={props.likeStatus}>{props.likeCounter}</S.Count>
    </>
  );

  return props.showBtn ? buttons : icons;
};

ReadAndLikeButtons.propTypes = {
  loading: PropTypes.shape({
    read: PropTypes.bool.isRequired,
    like: PropTypes.bool.isRequired,
    progress: PropTypes.bool,
  }),
  showBtn: PropTypes.bool.isRequired,
  readStatus: PropTypes.bool,
  likeStatus: PropTypes.bool,
  numberOfEntities: PropTypes.number.isRequired,
  likeCounter: PropTypes.number.isRequired,

  submitLike: PropTypes.func.isRequired,
  submitBook: PropTypes.func.isRequired
};

export default ReadAndLikeButtons;
