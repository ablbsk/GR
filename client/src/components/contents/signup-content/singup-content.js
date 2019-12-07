import React from "react";
import { Link } from "react-router-dom";

import SignupForm from "../../forms/singup-form/signup-form";

import * as S from "./style";
import {linkStyleButton} from "../../../style-constants";

const SignupContent = ({ submit }) => {
  return (
    <S.Container type="signup">
      <S.Header>Sing up</S.Header>
      <SignupForm submit={submit} />
      <S.SingUp>
        <Link to="/login" style={{ ...linkStyleButton }}>Login</Link>
      </S.SingUp>
    </S.Container>
  );
};

export default SignupContent;
