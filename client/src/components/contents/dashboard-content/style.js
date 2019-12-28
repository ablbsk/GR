import styled from "styled-components";

import {accentColorButton, PageHeader} from "../../../style-constants";

export const NoBooks = styled.div`
  text-align: center;
  margin-top: 3em;
`;

export const Section = styled.section`
   margin: 3em auto;
`;

export const FilterContainer = styled.div`
  margin: 2em auto;
  text-align: center;
`;

export const Button = styled.button`
  border: none;
  background-color: white;
  color: ${accentColorButton};
  cursor: pointer;
  font-size: 1em;
  margin: 0.5em 2em;
  font-weight: 600;
`;

export const SortContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Select = styled.select`
  width: 150px;
  height: 25px;
  margin-right: 3px;
`;

export const SortButton = styled.button`
  margin: 0 3px;
  padding: 5px;
  width: 60px;
  background-color: ${accentColorButton};
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export const PageH2 = PageHeader;
