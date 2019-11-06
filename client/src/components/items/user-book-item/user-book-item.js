import React, { Component } from "react";
import PropTypes from "prop-types";
import Rating from "react-rating";
import { Link } from "react-router-dom";

import DeleteButton from "../../buttons/delete-button/delete-button";
import LikeButton from "../../buttons/like-button/like-button";
import ReadProgressWidget from "../../widgets/read-progress-widget/read-progress-widget";

import * as S from "./style";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";
import ReadButton from "../../buttons/read-button/read-button";

class UserBookItem extends Component {
  render() {
    const { book } = this.props;
    return (
      <S.Article>
        <S.Left>
          <S.Cover src={book.image_url} alt="Cover" />
        </S.Left>
        <S.Center>
          <Link
            style={{ textDecoration: "none", color: "#414141" }}
            to={`/books/new/${book.goodreadsId}`}
          >
            <S.Title>{book.title}</S.Title>
          </Link>
          <S.Author>{book.authors}</S.Author>
          <S.Rating>
            <Rating
              initialRating={book.average_rating}
              emptySymbol={<img src={starBorder} alt="star" />}
              fullSymbol={<img src={star} alt="star" />}
              readonly
            />
            <S.RatingNum>{book.average_rating}</S.RatingNum>
          </S.Rating>
          <S.ButtonsDiv>
            <S.ButtonItem>
              {book.readStatus ? (
                <DeleteButton id={book.goodreadsId} inList={true} />
              ) : (
                <ReadButton book={book} inList={true} />
              )}
            </S.ButtonItem>
            <S.ButtonItem>
              <LikeButton
                id={book.goodreadsId}
                likeStatus={book.likeStatus}
                inList={true}
              />
            </S.ButtonItem>
          </S.ButtonsDiv>
        </S.Center>
        { book.readStatus && <S.Right>
          <S.ProgressH5>Your progress</S.ProgressH5>
          <ReadProgressWidget
            pages={book.pages}
            readPages={book.readPages}
            goodreadsId={book.goodreadsId}
            inList={true}
          />
        </S.Right> }
      </S.Article>
    );
  }
}

UserBookItem.propTypes = {
  book: PropTypes.shape({
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
};

export default UserBookItem;
