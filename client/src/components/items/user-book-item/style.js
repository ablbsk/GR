import styled from "styled-components";

import { boxShadowButton } from "../../../style-constants";

export const Article = styled.article`
  width: 470px;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  padding: 15px;
  box-shadow: ${boxShadowButton};
`;

export const Left = styled.div`
  width: 100px;
`;

export const Cover = styled.img`
  width: 100px;
  height: 150px;
  margin-bottom: 0.9em;
`;

export const Center = styled.div`
  width: 220px;
  margin: 0 15px;
`;

export const Title = styled.h4`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Author = styled.div`
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

export const ButtonsDiv = styled.div`
  text-align: center;
  margin-top: 1.75em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ButtonItem = styled.div`
  width: 40%;
`;

export const Right = styled.div`
  margin-rigth: 25px;
  width: 120px;
  text-align: center
`;

export const ProgressH5 = styled.h5`
  margin-top: 0.85em;
`;
