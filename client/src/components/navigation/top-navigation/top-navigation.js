import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Search from "../../search/search/search";
import UserButton from "../../buttons/user-button/user-button";

import vectorGR from "../../../img/vector.png";
import search from "../../../img/search_29.png";

import * as S from "./style";
import { linkStyleWhite } from "../../../style-constants";

const TopNavigation = ({ isAuthenticated, username }) => {
  const searchInputOrIcon =
    window.innerWidth > 500 ? (
      <Search />
    ) : (
      <Link to="/search?q=&page=1">
        <S.Icon
          src={search}
          alt="Go to search books page"
          title="Go to search books page"
        />
      </Link>
    );

  const loginOrUser = isAuthenticated ? (
    <>
      {window.innerWidth > 750 && <S.Username>{username}</S.Username>}
      <UserButton username={username}/>
    </>
  ) : (<Link style={{ ...linkStyleWhite }} to="/login">Login</Link>);

  return (
    <S.Header>
      <S.Logo>
        <Link to="/">
          <S.Icon src={vectorGR} alt="Go to home page" title="Go to home page" />
        </Link>
      </S.Logo>
      {searchInputOrIcon}
      {loginOrUser}
    </S.Header>
  );
};

function mapStateToProps(state) {
  return {
    username: state.user.username,
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(TopNavigation);
