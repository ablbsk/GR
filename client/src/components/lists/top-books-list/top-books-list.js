import React from "react";
import PropTypes from "prop-types";

import TopBooksItem from "../../items/top-books-item/top-books-item";

import * as S from "./style";

const TopBooksList = ({ books, topLikes }) => {
  return (
    <S.Container>
      <S.PageH2>{topLikes ? "Top likes" : "Top reads"}</S.PageH2>
      <S.Section>
        {Array.isArray(books) &&
          books.map(item => (
            <TopBooksItem key={item.goodreadsId} book={item} topLikes={topLikes}/>
          ))}
      </S.Section>
    </S.Container>
  );
};

TopBooksList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      goodreadsId: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      likeCounter: PropTypes.number.isRequired,
      numberOfEntities: PropTypes.number.isRequired,
      _id: PropTypes.string
    }).isRequired
  ).isRequired,
  topLikes: PropTypes.bool.isRequired
};

export default TopBooksList;
