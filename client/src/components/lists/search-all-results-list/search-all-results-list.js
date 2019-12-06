import React from "react";

import SearchAllResultsItem from "../../items/search-all-results-item/search-all-results-item";

import * as S from "./style";

const SearchAllResultsList = ({ books }) => {
  return (
    <S.Section>
      {Array.isArray(books) &&
        books.map(item => (
          <SearchAllResultsItem book={item} key={item.goodreadsId} />
        ))}
    </S.Section>
  );
};

export default SearchAllResultsList;
