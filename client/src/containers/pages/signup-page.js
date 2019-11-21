import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup } from "../../actions/users";

import SignupContent from "../../components/contents/signup-content/singup-content";

class SignupPage extends Component {
  submit = data =>
    this.props.signup(data).then(() => {
      this.props.history.push("/");
    });

  render() {
    return <SignupContent submit={this.submit} />;
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(
  null,
  { signup }
)(SignupPage);
