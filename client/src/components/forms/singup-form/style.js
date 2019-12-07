import styled from "styled-components";

import { FormInput, FormButton } from "../../../style-constants";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-content: space-around;
`;

export const FormField = styled.div`
  margin-top: 1em;
  text-align: center;
`;

export const Input = FormInput;

export const Button = FormButton;


