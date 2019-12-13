import React from "react";
import PropTypes from "prop-types";

import * as S from "./style";

const SearchAllResultsContent = (props) => {
  const statusOfResults = props.loading
    ? <S.Results>loading...</S.Results>
    : <S.Results>{props.resultMsg}</S.Results>;

  return (
    <S.Container>
      <S.PageH2>Search</S.PageH2>
      <S.SearchForm onSubmit={props.onSubmit}>
        <S.SearchInput
          type="text"
          id="inputValue"
          name="inputValue"
          placeholder="Search by Book Title"
          defaultValue={props.query}
          onChange={props.onChange}
        />
        <S.SearchButton>Search</S.SearchButton>
      </S.SearchForm>
      {statusOfResults}
      <hr />
      {props.result}
      {props.pagination}
    </S.Container>
  );
};

SearchAllResultsContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  pagination: PropTypes.element,
  result: PropTypes.element,
  resultMsg: PropTypes.element,

  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchAllResultsContent;
