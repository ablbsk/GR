import React from "react";
import PropTypes from "prop-types";

import UserBooksList from "../../lists/user-books-list/user-books-list";

import * as S from "./style";

const DashboardContent = ({ booksLength, books, changeFilters }) => {
  const filtersBtn = [
    { text: 'All', id: 'all' },
    { text: 'Read', id: 'read', },
    { text: 'Like', id: 'like' }
  ];

  return (
    <S.Section>
      <S.PageH2>My books</S.PageH2>
      <S.FilterContainer>
        {booksLength !== 0 && filtersBtn.map(btn => (
          <S.Button key={btn.id} onClick={() => changeFilters(btn.id)}>{btn.text}</S.Button>
        ))}
      </S.FilterContainer>
      {Array.isArray(books) ? <UserBooksList books={books} /> : <S.NoBooks>No books</S.NoBooks>}
    </S.Section>
  )
};

DashboardContent.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      goodreadsId: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      likeStatus: PropTypes.bool.isRequired,
      likeCounter: PropTypes.number.isRequired,
      readStatus: PropTypes.bool.isRequired,
      numberOfEntities: PropTypes.number.isRequired,
      pages: PropTypes.number.isRequired,
      readPages: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      options: PropTypes.shape({
        error: PropTypes.string,
        whatLoading: PropTypes.string,
      }).isRequired,
      _id: PropTypes.string
    })
  ),
  bookLength: PropTypes.number,

  changeFilters: PropTypes.func.isRequired
};

export default DashboardContent;
