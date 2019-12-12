import React from "react";
import PropTypes from "prop-types";
import Rating from "react-rating";

import BookFeatures from "../../../containers/book-features";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";

import * as S from "./style";

const BookContent = ({ book }) => {

  const createDescription = () => {
    return { __html: book.description };
  };

  const authorAndRating = (
    <>
      <S.Author>by {book.authors}</S.Author>
      <S.Rating>
        <Rating
          initialRating={book.average_rating}
          emptySymbol={<img src={starBorder} alt="star" />}
          fullSymbol={<img src={star} alt="star" />}
          readonly
        />
        <S.RatingNum>{book.average_rating}</S.RatingNum>
      </S.Rating>
    </>
  );

  const leftCoverAndBtns = (
    <S.Left>
      <S.Cover src={book.image_url} alt={`${book.title} cover`} />
      <BookFeatures
        book={book}
        onDashboardPage={false}
        viewProgress={true}
      />
    </S.Left>
  );

  const mainCoverAndContent = (
    <S.Main>
      <S.MainCover>
        <S.Cover src={book.image_url} alt={`${book.title} cover`} />
      </S.MainCover>
      <div>
        {authorAndRating}
        <BookFeatures book={book} onDashboardPage={false} viewProgress={true} />
      </div>
    </S.Main>
  );

  return (
    <S.Section>
      {window.innerWidth > 600 && leftCoverAndBtns}
      <S.Right>
        <S.Title>{book.title}</S.Title>
        {window.innerWidth > 600 && authorAndRating}
        {window.innerWidth < 600 && mainCoverAndContent}
        <S.Description dangerouslySetInnerHTML={createDescription()} />
        <S.Publish>
          <div>
            {book.format}, pages {book.pages}
          </div>
          <div>
            Published {book.publication_month}/{book.publication_day}/
            {book.publication_year} by {book.publisher}
          </div>
        </S.Publish>
      </S.Right>
    </S.Section>
  );
};

BookContent.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    average_rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    likeStatus: PropTypes.bool.isRequired,
    goodreadsId: PropTypes.string.isRequired,
    pages: PropTypes.string.isRequired,
    publication_day: PropTypes.string.isRequired,
    publication_month: PropTypes.string.isRequired,
    publication_year: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    readPages: PropTypes.number.isRequired,
    readStatus: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired
};

export default BookContent;
