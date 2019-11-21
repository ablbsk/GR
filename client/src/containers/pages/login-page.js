import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

import LoginContent from "../../components/contents/login-content/login-content";

class LoginPage extends Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push("/"));

  render() {
    return <LoginContent submit={this.submit} />;
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  { login }
)(LoginPage);
