import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as S from "./style";
import {linkStyle} from "../../../style-constants";

const DropdownBookItem = ({ book }) => {
  return (
    <Link
      style={{ ...linkStyle }}
      to={{ pathname: `/books/new/${book.goodreadsId}` }}
    >
      <S.Container>
        <S.BookImg src={book.image_url} alt={`${book.title} cover`} />
        <S.Data>
          <S.Title>{book.title}</S.Title>
          <S.Author>by {book.authors}</S.Author>
        </S.Data>
      </S.Container>
    </Link>
  );
};

DropdownBookItem.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    goodreadsId: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired
  }).isRequired
};

export default DropdownBookItem;
