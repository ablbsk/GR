import styled from "styled-components";

import { headerBackground, searchColor, border, sizes } from "../../../style-constants";

export const Search = styled.div`
    font-weight: normal;
    font-style: normal;

    margin-left: 2%;

    color: ${searchColor};

    flex-grow: 2;
`;

export const Input = styled.input`
    font-size: 0.85em;

    width: 300px;
    height: 2em;
    padding: 0 0.25em;

    color: ${searchColor};
    border: ${border};
    border-right: 0;
    outline: none;
    background: ${headerBackground};

  &::-webkit-input-placeholder {
    color: ${searchColor};
  }
  
  @media (max-width: ${sizes.screen600}) {
      width: 260px;
  }
`;
