import styled from "styled-components";
import {CardIconBtn, headerBackground, wordsErrorColor} from "../../../style-constants";

export const IconBtn = CardIconBtn;

export const Icon = styled.img`
  width: 1.75em;
`;

export const Count = styled.span`
  color: ${props => props.status ? wordsErrorColor : headerBackground};
`;
