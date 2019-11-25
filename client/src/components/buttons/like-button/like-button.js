import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import {
  addLike,
  deleteLike,
  addLikeInList,
  deleteLikeInList
} from "../../../actions/books";

import * as S from "./style";
import likeEmpty from "../../../img/like_empty.png";
import likeFull from "../../../img/like_full.png";

const LikeButton = props => {
  const onSubmit = e => {
    e.preventDefault();

    const { id } = props;
    const toastrSuccess = toastr.success("Successful", "Changes installed successfully");

    if (props.inList) {
      (props.likeStatus ? props.deleteLikeInList(id) : props.addLikeInList(id))
        .then(() => toastrSuccess)
        .catch(error => toastr.error("Server Error", error.response.data.error));
    } else {
      (props.likeStatus ? props.deleteLike(id) : props.addLike(id))
        .then(() => toastrSuccess)
        .catch(error => toastr.error("Server Error", error.response.data.error));
    }
  };

  const likeIconEmpty = <S.LikeIcon src={likeEmpty} onClick={onSubmit} alt="Add like" />;
  const likeIconFull = <S.LikeIcon src={likeFull} onClick={onSubmit} alt="Delete like" />;

  return props.likeStatus ? likeIconFull : likeIconEmpty;
};

LikeButton.propTypes = {
  id: PropTypes.string.isRequired,
  likeStatus: PropTypes.bool.isRequired,
  addLike: PropTypes.func.isRequired,
  addLikeInList: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  deleteLikeInList: PropTypes.func.isRequired,
  inList: PropTypes.bool.isRequired
};

export default connect(
  null,
  { addLike, deleteLike, addLikeInList, deleteLikeInList }
)(LikeButton);
