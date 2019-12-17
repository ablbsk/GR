import React from "react";
import PropTypes from "prop-types";
import ButtonLoading from "../../loaders/button-loading/button-loading";

import * as S from "./style";

import progress from "../../../img/progress_full.png";
import accept from "../../../img/accept.png";

const ProgressButton = props => {
  const { visibilityProgress, pages, readPages, onChange, submit, changeVisibility, loading, location } = props;
  const value = readPages || 0;

  return visibilityProgress ? (
    <S.Container location={location}>
      <S.IconBtn src={accept} onClick={submit} />
      <S.Input
        type="text"
        name="readPages"
        id="readPages"
        defaultValue={value}
        onChange={onChange}
      />
      <span>/{pages}</span>
    </S.Container>
  ) : (
    <S.Container location={location}>
      {loading ? <ButtonLoading /> : <S.IconBtn src={progress} onClick={changeVisibility} />}
      <span>{value}/{pages}</span>
    </S.Container>
  );
};

ProgressButton.propTypes = {
  visibilityProgress: PropTypes.bool.isRequired,
  loading: PropTypes.string,
  pages: PropTypes.number.isRequired,
  readPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  changeVisibility: PropTypes.func.isRequired,
};

export default ProgressButton;
