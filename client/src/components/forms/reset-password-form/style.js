import styled from "styled-components";
import { accentColorButton, FormContainer, FormInput, FormButton } from "../../../style-constants";

export const Container = FormContainer;

export const Header = styled.h2`
   color: ${accentColorButton};
   margin-bottom: 3em;
   font-size: 1.25em;
`;

export const FormField = styled.div`
  margin: 2em 0;
  text-align: center;
`;

export const Input = FormInput;

export const Button = FormButton;
