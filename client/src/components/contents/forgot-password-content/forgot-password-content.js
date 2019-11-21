import React from "react";

import ForgotPasswordForm from "../../forms/forgot-password-form/forgot-password-form";

import * as S from "./style";
import acceptImg from "../../../img/accept.png";

const ForgotPasswordContent = ({ success, submit }) => {
  return (
    <S.Container>
      {success ? (
        <S.Message>
          <S.Img src={acceptImg} alt="" />
          <p>Email has been sent.</p>
        </S.Message>
      ) : (
        <>
          <S.Header>Forgot password</S.Header>
          <ForgotPasswordForm submit={submit} />
        </>
      )}
    </S.Container>
  )
};

export default ForgotPasswordContent;
