import styled from "styled-components";

import { boxShadowButton, sizes, CardTitle, CardCover, CardAuthor, CardRatingNum } from "../../../style-constants";

export const Article = styled.article`
  width: 460px;
  height: 220px;
  display: flex;
  flex-wrap: wrap;
  margin: 1em 0.75em;
  padding-top: 1em;
  box-shadow: ${boxShadowButton};
  
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
    height: 235px;
  };
  
  @media (max-width: ${sizes.mobile375}) {
    width: 340px;
  };
  
  @media (max-width: ${sizes.mobile320}) {
    width: 300px;
  };
`;

/* =========================== LEFT ======================== */

export const Left = styled.div`
  width: 100px;
  margin-left: 1em;
  
  @media (max-width: ${sizes.mobile414}) {
    width: 95px;
  };
  
  @media (max-width: ${sizes.mobile320}) {
    width: 90px;
  };
`;

export const Cover = CardCover;

export const Widget = styled.div`
  display: flex;
    align-items: baseline;
    justify-content: space-around;
`;

/* =========================== RIGHT ======================== */

export const Right = styled.div`
  width: 310px;
  margin: 0 1em;
  
  @media (max-width: ${sizes.screen1000}) {
    width: 400px;
  };
  
  @media (min-width: ${sizes.screen880}) and (max-width: 999px) {
    width: 250px;
  };
  
  @media (max-width: ${sizes.screen600}) {
    width: 310px;
  };
  
  @media (max-width: ${sizes.mobile414}) {
    width: 225px;
  };
  
  @media (max-width: ${sizes.mobile375}) {
    width: 190px;
  };
  
  @media (max-width: ${sizes.mobile320}) {
    width: 155px;
  };
`;

export const Title = CardTitle;

export const Author = CardAuthor;

export const Rating = styled.div`
  cursor: default;
  position: relative;
  margin-bottom: 0.4em;
`;

export const RatingNum = CardRatingNum;

export const Description = styled.div`
  width: 100%; 
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  -webkit-line-clamp: 6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-size: 0.85em;
`;
