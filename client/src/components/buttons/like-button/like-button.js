import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import {
  addLike,
  addLikeInList,
  deleteLikeOnBookPage,
  deleteLikeOnHomePage,
  deleteLikeOnDashboardPage
} from "../../../actions/books";

import * as S from "./style";
import likeEmpty from "../../../img/like_empty.png";
import likeFull from "../../../img/like_full.png";

const LikeButton = props => {
  const onSubmit = e => {
    e.preventDefault();

    const {
      goodreadsId,
      page,
      likeStatus,
      addLike,
      addLikeInList,
      deleteLikeOnBookPage,
      deleteLikeOnHomePage,
      deleteLikeOnDashboardPage
    } = props;
    let result;

    if (!likeStatus) {
      result = (page === 'book') ? addLike(goodreadsId) : addLikeInList(goodreadsId);
    } else  {
      switch (page) {
        case 'home':
          result = deleteLikeOnHomePage(goodreadsId);
          break;
        case 'dashboard':
          result = deleteLikeOnDashboardPage(goodreadsId);
          break;
        case 'book':
          result = deleteLikeOnBookPage(goodreadsId);
          break;
      }
    }

    result
      .then(() => toastr.success("Successful", "Changes installed successfully"))
      .catch(error => toastr.error("Server Error", error.response.data.error));
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
  { addLike, addLikeInList, deleteLikeOnBookPage, deleteLikeOnHomePage, deleteLikeOnDashboardPage }
)(LikeButton);
