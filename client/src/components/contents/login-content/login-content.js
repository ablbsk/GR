import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "../../forms/login-form/login-form";

import * as S from "./style";
import { linkStyle, linkStyleButton } from "../../../style-constants";

const LoginContent = ({ submit }) => {
  return (
    <S.Container type="login">
      <S.Header>Login</S.Header>
      <LoginForm submit={submit} />
      <S.SingUp>
        <Link to="/signup" style={{ ...linkStyleButton }}>Sign up</Link>
      </S.SingUp>
      <S.ForgotPassword>
        <Link
          style={{ ...linkStyle, fontSize: "0.8em" }}
          to="/forgot_password"
        >
          Forgot Password?
        </Link>
      </S.ForgotPassword>
    </S.Container>
  );
};

export default LoginContent;
