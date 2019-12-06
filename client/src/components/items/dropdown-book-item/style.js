import styled from "styled-components";

import { border, headerBackground, sizes } from "../../../style-constants";

export const Container = styled.div`
    display: flex;

    height: 3.5em;

    border: ${border};
    border-top: none;

    align-items: center;
    
    &:hover {
      background-color: #FFD7A7;
      transition: all 0.25s ease-out;
  }
`;

export const BookImg = styled.img`
  width: 2.5em;
  height: 100%;
  padding: 0 .5em; 
`;

export const Data = styled.div`
  width: 265px;
  
  @media (max-width: ${sizes.screen600}) {
      width: 225px;
  }
`;

export const Title = styled.div`
    font-size: .95em;
    font-weight: bold;

    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: ${headerBackground};
`;

export const Author = styled.div`
    font-size: .85em;
    font-weight: normal;

    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    color: ${headerBackground};
`;
