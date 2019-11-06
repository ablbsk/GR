import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Search from "../../search/search/search";
import UserButton from "../../buttons/user-button/user-button";

import vectorGR from "../../../img/vector.png";

import * as S from "./style";

const TopNavigation = ({ isAuthenticated, username }) => (
  <S.Header>
    <Link to="/">
      <S.Icon src={vectorGR} alt="Go to main page" />
    </Link>
    <Search />
    {isAuthenticated ? (
      <Fragment>
        <S.Username>{username}</S.Username>
        <UserButton />
      </Fragment>
    ) : (
      <Link
        style={{ textDecoration: "none", color: "#FFFFFF", fontSize: "1.1em" }}
        to="/login"
      >
        Login
      </Link>
    )}
  </S.Header>
);

function mapStateToProps(state) {
  return {
    username: state.user.username,
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(TopNavigation);
