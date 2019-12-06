import styled from "styled-components";

import { boxShadowButton, sizes, CardTitle, CardCover, CardAuthor, CardRatingNum } from "../../../style-constants";

export const Article = styled.article`
  width: 460px;
  height: 165px;
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
  margin-bottom: 2.5em;
  
  @media (max-width: ${sizes.mobile414}) {
    margin-bottom: 1.25em;
  }
`;

export const RatingNum = CardRatingNum;

export const Buttons =styled.div`
  & > span {
    margin: 0 5px;
    
    @media (max-width: ${sizes.mobile414}) {
      font-size: 0.9em;
    }
    
    @media (max-width: ${sizes.mobile375}) {
      font-size: 0.8em;
    }
  }
`;
