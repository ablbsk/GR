import React from "react";

import * as S from "./style";

const ConfirmationContent = ({ loading, success }) => {
  return (
    <div>
      {loading && (
        <S.ContainerLoading>
          <S.Message>Validation your email...</S.Message>
        </S.ContainerLoading>
      )}

      {!loading && success && (
        <S.ContainerSuccess>
          <S.Message>Thank you. Your account has been verified</S.Message>
        </S.ContainerSuccess>
      )}

      {!loading &&
      !success && (
        <S.ContainerFailure>
          <S.Message>Ooops. Invalid token it seems.</S.Message>
        </S.ContainerFailure>
      )}
    </div>
  )
};

export default ConfirmationContent;
