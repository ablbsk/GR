import React, { Component } from "react";
import PropTypes from "prop-types";
import Rating from "react-rating";
import { Link } from "react-router-dom";

import BookFeatures from "../../../containers/book-features";

import * as S from "./style";
import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";
import { linkStyle } from "../../../style-constants";

class UserBookItem extends Component {
  render() {
    const { book } = this.props;
    return (
      <S.Article>
        <S.Left>
          <S.Cover src={book.image_url} alt="Cover" />
        </S.Left>
        <S.Right>
          <Link
            style={{ ...linkStyle }}
            to={`/books/new/${book.goodreadsId}`}
          >
            <S.Title title={book.title}>{book.title}</S.Title>
          </Link>
          <S.Author>{book.authors}</S.Author>
          <S.Rating>
            <Rating
              initialRating={book.average_rating}
              emptySymbol={<img src={starBorder} alt="star" />}
              fullSymbol={<img src={star} alt="star" />}
              readonly
            />
            <S.RatingNum title="Goodread's rating">{book.average_rating}</S.RatingNum>
          </S.Rating>
          <S.Buttons>
            <BookFeatures
              book={book}
              onDashboardPage={true}
              viewProgress={true}
            />
          </S.Buttons>
          </S.Right>
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
