import React from "react";
import Rating from "react-rating";
import { Link } from "react-router-dom";

import BookFeatures from "../../../containers/book-features";

import * as S from "./style";
import { linkStyle } from "../../../style-constants";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";

const TopBooksItem = ({ isAuthenticated, isConfirmed, book }) => {
  const createDescription = () => {
    const { description } = book;
    return { __html: description };
  };

  return (
    <S.Article>
      <S.Left>
        <S.Cover src={book.image_url} alt="" />
        <S.Widget>
          <BookFeatures
            book={book}
            onDashboardPage={false}
            viewProgress={false}
          />
        </S.Widget>
      </S.Left>
      <S.Right>
        <Link
          style={{ ...linkStyle }}
          to={`/books/new/${book.goodreadsId}`}
        >
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

export default TopBooksItem;
