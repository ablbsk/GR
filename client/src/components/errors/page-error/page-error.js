import React from "react";
import PropTypes from "prop-types";

import * as S from "./style";
import pageError from "../../../img/error.png";

const PageError = ({ title }) => {
  return (
    <S.Container>
      <S.ImgError src={pageError} alt="Error. Something went wrong" />
      <S.Title>{title}</S.Title>
    </S.Container>
  )
};

PageError.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageError;
