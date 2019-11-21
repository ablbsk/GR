import React from "react";
import { Link } from "react-router-dom";

import SignupForm from "../../forms/singup-form/signup-form";

import * as S from "./style";

const SignupContent = ({ submit }) => {
  return (
    <S.Container>
      <S.Header>Sing up</S.Header>
      <SignupForm submit={submit} />
      <S.SingUp>
        <Link
          to="/login"
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
          Login
        </Link>
      </S.SingUp>
    </S.Container>
  );
};

export default SignupContent;
