import React from "react";
import PropTypes from "prop-types";
import UserBookItem from "../../items/user-book-item/user-book-item";

import * as S from "./style";

const UserBooksList = ({ books }) => {
  return (
    <S.Container>
      {books && books.map(item => <UserBookItem book={item} key={item._id} />)}
    </S.Container>
  );
};

UserBooksList.propTypes = {
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
    }).isRequired
  ).isRequired
};

export default UserBooksList;
