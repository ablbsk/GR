import styled from "styled-components";

import { accentColorButton, FormContainer } from "../../../style-constants";

export const Container = FormContainer;

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
