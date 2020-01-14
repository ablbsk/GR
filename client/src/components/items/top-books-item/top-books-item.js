import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Rating from "react-rating";

import BookFeatures from "../../../containers/book-features";

import * as S from "./style";
import { linkStyle } from "../../../style-constants";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";

const TopBooksItem = ({ book, location }) => {
  const createDescription = () => {
    const { description } = book;
    return { __html: description };
  };

  return (
    <S.Article>
      <S.Left>
        <S.Cover src={book.image_url} alt={`${book.title}} title`} />
        <S.Widget>
          <BookFeatures book={book} viewProgress={false} location={location} />
        </S.Widget>
      </S.Left>
      <S.Right>
        <Link style={{ ...linkStyle }} to={`/books/new/${book.goodreadsId}`}>
          <S.Title title={book.title}>{book.title}</S.Title>
        </Link>
        <S.Author>by {book.authors}</S.Author>
        <S.Rating>
          <Rating
            initialRating={book.average_rating}
            emptySymbol={<img src={starBorder} alt="star" />}
            fullSymbol={<img src={star} alt="star" />}
            readonly
          />
          <S.RatingNum title="Goodread's rating">{book.average_rating}</S.RatingNum>
        </S.Rating>
        <S.Description dangerouslySetInnerHTML={createDescription()} />
      </S.Right>
    </S.Article>
  );
};

TopBooksItem.propTypes = {
  book: PropTypes.shape({
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
  location: PropTypes.string.isRequired
};

export default TopBooksItem;
