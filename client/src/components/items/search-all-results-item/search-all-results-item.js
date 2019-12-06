import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Rating from "react-rating";

import * as S from "./style";

import starBorder from "../../../img/star_border.png";
import star from "../../../img/star.png";
import {linkStyle} from "../../../style-constants";

const SearchAllResultsItem = ({ book }) => {
  return (
      <S.SearchArticle>
        <div>
          <S.Cover src={book.image_url} alt="" />
        </div>
        <S.DataDiv>
          <Link to={{ pathname: `/books/new/${book.goodreadsId}` }}
                style={{ ...linkStyle }}
          >
            <S.Title title={book.title}>{book.title}</S.Title>
          </Link>
          <S.Author>by {book.authors}</S.Author>
          <S.Rating>
            <Rating
              initialRating={book.rating}
              emptySymbol={<img src={starBorder} alt="star" />}
              fullSymbol={<img src={star} alt="star" />}
              readonly
            />
            <S.RatingNum>{book.rating}</S.RatingNum>
          </S.Rating>
        </S.DataDiv>
      </S.SearchArticle>
  );
};

SearchAllResultsItem.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    goodreadsId: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired
  }).isRequired
};

export default SearchAllResultsItem;
