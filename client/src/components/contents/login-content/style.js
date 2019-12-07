import styled from "styled-components";

import { accentColorButton, headerBackground, wordsColorButton, FormContainer } from "../../../style-constants";

export const Container = FormContainer;

export const Header = styled.h2`
   color: ${accentColorButton};
   margin-bottom: 3em;
   font-size: 1.25em;
`;

export const SingUp = styled.div`
  background-color: ${headerBackground};
  color: ${wordsColorButton};
  margin: 1em 0;
  padding: 0.5em;
  text-align: center;
`;

export const ForgotPassword = styled.div`
  text-align: center;
  margin: 0.5em;
`;
