import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPasswordRequest } from '../../../actions/auth';

import ForgotPasswordForm from '../../forms/forgot-password-form/forgot-password-form';

import acceptImg from "../../../img/accept.png";
import * as S from "./style";

class ForgotPasswordPage extends Component {

  state = {
    success: false
  };

  submit = data =>
    this.props
      .resetPasswordRequest(data)
      .then(() => {
        this.setState({
          success: true
        })
      });

  render() {
    return (
      <S.Container>
        {this.state.success ? (
          <S.Message>
            <S.Img src={acceptImg} alt="" />
            <p>Email has been sent.</p>
          </S.Message>
          ) : (
            <Fragment>
              <S.Header>Forgot password</S.Header>
              <ForgotPasswordForm submit={this.submit} />
            </Fragment>
          )}
      </S.Container>
    )
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);
