import styled from "styled-components";

import { borderColor, sizes } from "../../../style-constants";

export const Section = styled.div`
  margin: 3em auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: ${sizes.screen1000}) {
    width: 970px;
  }
  
  @media (max-width: ${sizes.screen1000}) {
    margin: 3em 2em;
  }
  
  @media (max-width: ${sizes.screen600}) {
    margin: 3em 1em;
  }
`;

/* --------------------- LEFT ----------------------- */

export const Left = styled.div`
  text-align: center;
  width: 160px;
  
  @media (min-width: ${sizes.screen600}) and (max-width: ${sizes.screen880}) {
    width: 128px;
  }
`;

export const Cover = styled.img`
  margin-bottom: 10px;
  
  width: 100%;
`;

/* --------------------- RIGHT ---------------------- */

export const Right = styled.div`
  margin: 0 1.25em;
  width: 720px;
  
  @media (min-width: ${sizes.screen600}) and (max-width: ${sizes.screen1000}) {
    width: 65%;
  }
`;

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0.25em;
  font-size: 1.4em;
  
  @media (max-width: ${sizes.screen600}) {
    text-align: center;
    margin-bottom: 2em;
  }
`;

export const Author = styled.div`
  font-size: 1.25em;
  margin-bottom: 0.25em;
`;

export const Rating = styled.div`
  position: relative;
  margin-bottom: 1.5em;
`;

export const RatingNum = styled.span`
  position: absolute;
  top: 2px;
  padding-left: 0.4em;
`;

export const Description = styled.div`
  text-align: justify;
  padding-bottom: 1.25em;
  border-bottom: 1px solid ${borderColor};
`;

export const Publish = styled.div`
  padding-top: 1.25em;
  font-size: 0.8em;
`;

/* --------------------- MAIN ---------------------- */

export const Main = styled.div`
  display: flex;
  margin: 1.5em 0;
`;

export const MainCover = styled.div`
  width: 40%;
  margin-right: 1em; 
`;
