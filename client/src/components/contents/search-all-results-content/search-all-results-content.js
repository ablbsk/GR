import React from "react";
import * as S from "./style";

const SearchAllResultsContent = (props) => {
  const statusOfResults = props.loading
    ? <S.Results>loading...</S.Results>
    : <S.Results>{props.resultMsg}</S.Results>;

  return (
    <S.Container>
      <S.HeadingH1>Search</S.HeadingH1>
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

export default SearchAllResultsContent;
