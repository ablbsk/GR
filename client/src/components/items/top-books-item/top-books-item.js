import React from "react";
import Rating from "react-rating";
import { Link } from "react-router-dom";

import AddLikeBookWidget from "../../widgets/add-like-book-widget/add-like-book-widget";

import * as S from "./style";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";

const TopBooksItem = ({ book }) => {
  const createDescription = () => {
    const { description } = book;
    return { __html: description };
  };

  return (
    <S.Article>
      <S.Left>
        <S.Cover src={book.image_url} alt="" />
        <S.Widget>
          <AddLikeBookWidget book={book} page={'home'} />
        </S.Widget>
      </S.Left>
      <S.Right>
        <Link
          style={{ textDecoration: "none", color: "#414141"}}
          to={`/books/new/${book.goodreadsId}`}
        >
          <S.Title>{book.title}</S.Title>
        </Link>
        <S.Athor>by {book.authors}</S.Athor>
        <S.Rating>
          <Rating
            initialRating={book.average_rating}
            emptySymbol={<img src={starBorder} alt="star" />}
            fullSymbol={<img src={star} alt="star" />}
            readonly
          />
          <S.RatingNum>{book.average_rating}</S.RatingNum>
        </S.Rating>
        <S.Description dangerouslySetInnerHTML={createDescription()} />
      </S.Right>
    </S.Article>
  );
};

export default TopBooksItem;
