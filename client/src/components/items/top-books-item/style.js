import styled from "styled-components";

import { accentColorButton, boxShadowButton } from "../../../style-constants";

export const Article = styled.article`
  width: 490px;
  height: 220px;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  padding-top: 15px;
  box-shadow: ${boxShadowButton};
`;

export const Left = styled.div`
  width: 100px;
  margin-left: 15px;
`;

export const Cover = styled.img`
  width: 100px;
  height: 150px;
  margin-bottom: 0.6em;
`;

export const Widget = styled.div`
  display: flex;
    align-items: baseline;
    justify-content: space-around;
`;

export const Right = styled.div`
  width: 340px;
  margin: 0 15px;
`;

export const Title = styled.h4`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    color: ${accentColorButton};
    transition: all 0.25s ease-out;
  }
`;

export const Athor = styled.div`
  margin: 0.35em 0;
  font-size: 0.85em;
`;

export const Rating = styled.div`
  position: relative;
  margin-bottom: 0.4em;
`;

export const RatingNum = styled.span`
  position: absolute;
  top: 2px;
  padding-left: 0.4em;
`;

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

export const ButtonsDiv = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ButtonItem = styled.div`
  width: 40%;
`;
