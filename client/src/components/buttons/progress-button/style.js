import styled from "styled-components";
import { CardIconBtn } from "../../../style-constants";

export const IconBtn = CardIconBtn;

export const Input = styled.input`
  width: 2.5em;
  margin: 0.2em 0;
`;

export const Container = styled.div`
  display: ${props => props.location === "book" ? "block" : "inline"}
`;
