import styled from "styled-components";

import { accentColorButton, boxShadowButton } from "../../../style-constants";

export const Container = styled.div`
  width: 400px;
  height: 275px;
  
  padding: 1em 2em;
  position: absolute;
    
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  
  background: #FFFFFF;
  box-shadow: ${boxShadowButton};
`;

export const Header = styled.h2`
   color: ${accentColorButton};
   margin-bottom: 3em;
   font-size: 1.25em;
`;

export const Img = styled.img`
  width: 50px;
`;

export const Message = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 300px;
    text-align: center;
    height: 60px;
    font-size: 1.2em;
`;
