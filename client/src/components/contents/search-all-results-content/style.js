import styled from "styled-components";

import { border, boxShadowButton, wordsColorButton, accentColorButton, PageHeader, PageContainer, sizes } from "../../../style-constants";

export const Container = PageContainer;

export const PageH2 = PageHeader;

export const SearchForm = styled.form`
  margin: 2em;
  text-align: center;
`;

export const SearchInput = styled.input`
  width: 25em;
  height: 2em;
  font-size: 1em;
  border: ${border};
  box-sizing: border-box;
  padding: 0.25rem;
  outline: none;
  
    
  @media (max-width: ${sizes.screen600}) {
    width: 20em;
  }
  
  @media (max-width: ${sizes.mobile414}) {
    width: 13em;
  }
`;

export const SearchButton = styled.button`
  margin-left: 0.5em;
  padding: 0.6em 1.5em;
  font-weight: 600;
  background-color: ${accentColorButton};
  color: ${wordsColorButton};
  box-shadow: ${boxShadowButton};
  border: none;
  cursor: pointer;
  
  @media (max-width: ${sizes.mobile414}) {
    padding: 0.6em 1.25em;
  }
`;

export const Results = styled.div`
  font-size: 0.9em;
  text-align: center;
  margin-top: 1.5em;
  cursor: default;
`;

export const PaginationDiv = styled.div`
  text-align: center;
  margin: 1em 0;
`;
