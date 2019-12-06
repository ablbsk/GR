import styled from "styled-components";

import { accentColorButton, CardRatingNum, headerBackground, boxShadowButton, sizes } from "../../../style-constants";

export const SearchArticle = styled.article`
  display: flex;
  align-items: center;
  padding: 0.25em 0;
  color: ${headerBackground};
  box-shadow: ${boxShadowButton};
  width: 460px;
  height: 75px;
  margin: 0.75em 0;
  
  @media (max-width: ${sizes.screen1000}) {
    width: 550px;
  };
  
  @media (min-width: ${sizes.screen880}) and (max-width: 999px) {
    width: 400px;
  };
  
  @media (max-width: ${sizes.screen600}) {
    width: 460px;
  };
  
  @media (max-width: ${sizes.mobile414}) {
    width: 390px;
  };
  
  @media (max-width: ${sizes.mobile375}) {
    width: 340px;
  };
  
  @media (max-width: ${sizes.mobile320}) {
    width: 300px;
  };
`;

export const Cover = styled.img`
  height: 75px;
  width: 55px;
  margin-left: 10px;
`;

export const DataDiv = styled.div`
  padding: 0 10px;
  overflow: hidden;
  width: 100%;
`;

export const Title = styled.h4`
  margin: 0 0 0.2em 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  &:hover {
    color: ${accentColorButton};
    transition: all 0.25s ease-out;
  }
`;

export const Author = styled.div`
  margin: 0.15em 0;
  font-size: 0.9em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Rating = styled.div`
  position: relative;
`;

export const RatingNum = CardRatingNum;
