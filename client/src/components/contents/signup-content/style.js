import styled from "styled-components";

import { accentColorButton, boxShadowButton, headerBackground, wordsColorButton, sizes } from "../../../style-constants";

export const Container = styled.div`
  width: 400px;
  height: 470px;
  
  padding: 1em 2em;
  position: absolute;
    
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  
  background: #FFFFFF;
  box-shadow: ${boxShadowButton};
  
  @media (max-width: ${sizes.screen600}) {
    width: 70%;
  }
`;

export const Header = styled.h2`
   color: ${accentColorButton};
   margin-bottom: 2em;
   font-size: 1.25em;
`;

export const SingUp = styled.div`
  background-color: ${headerBackground};
  color: ${wordsColorButton};
  margin: 1em 0;
  padding: 0.5em;
  text-align: center;
`;
