import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/auth";

import * as S from "./style";
import { linkStyleWhite } from "../../../style-constants";

const DropdownUserList = ({ username, visibility, logout }) => {
  return visibility ? (
    <S.Container>
      {window.innerWidth < 750 && (
        <S.Username title={`Hi ${username}`}>{username}</S.Username>
      )}
      <S.Item>
        <Link style={{ ...linkStyleWhite }} to="/dashboard">My Books</Link>
      </S.Item>
      <S.Item>
        <S.Button onClick={() => logout()}>Logout</S.Button>
      </S.Item>
    </S.Container>
  ) : null;
};

export default connect(
  null,
  { logout }
)(DropdownUserList);
