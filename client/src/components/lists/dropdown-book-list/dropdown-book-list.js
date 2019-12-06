import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getBookData } from "../../../actions/books";

import DropdownBookItem from "../../items/dropdown-book-item/dropdown-book-item";

import * as S from "./style";
import {linkStyle} from "../../../style-constants";

const DropdownBookList = ({ books, query, visibility }) => {
  const haveResults =
    Array.isArray(books) &&
    books.map(item => <DropdownBookItem key={item.goodreadsId} book={item} />);

  const notFound = typeof books === "string" && (
    <S.AllResults>{books}</S.AllResults>
  );

  const haveQuery = Array.isArray(books) && query && (
    <Link
      style={{ ...linkStyle }}
      to={{ pathname: "/search", search: `?q=${query}&page=1` }}
    >
      <S.AllResults>Show all results for "{query}"</S.AllResults>
    </Link>
  );

  return visibility ? (
    <S.Container>
      {haveResults}
      {haveQuery}
      {notFound}
    </S.Container>
  ) : null;
};

DropdownBookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      goodreadsId: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  query: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  getBookData: PropTypes.func.isRequired
};

export default connect(
  null,
  { getBookData }
)(DropdownBookList);
