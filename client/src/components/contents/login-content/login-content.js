import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "../../forms/login-form/login-form";

import * as S from "./style";

const LoginContent = ({ submit }) => {
  return (
    <S.Container>
      <S.Header>Login</S.Header>
      <LoginForm submit={submit} />
      <S.SingUp>
        <Link
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#FFFFFF",
            fontSize: "1em",
            fontWeight: "600",
            width: "100%",
            height: "100%",
            display: "block"
          }}
        >
          Sign up
        </Link>
      </S.SingUp>
      <S.ForgotPassword>
        <Link
          style={{
            textDecoration: "none",
            color: "#414141",
            fontSize: "0.8em"
          }}
          to="/forgot_password"
        >
          Forgot Password?
        </Link>
      </S.ForgotPassword>
    </S.Container>
  );
};

export default LoginContent;
