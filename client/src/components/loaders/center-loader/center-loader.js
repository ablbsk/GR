import React from "react";

import * as S from "./style";

const CenterLoading = () => {
  return (
    <S.Container>
      <S.Spinner viewBox="0 0 50 50" >
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
      </S.Spinner>
    </S.Container>
  );
};

export default CenterLoading;
