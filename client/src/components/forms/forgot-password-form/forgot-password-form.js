import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { forgotPasswordValidation } from "../../../utils/validation/forgot-password-validation";

import InlineError from '../../messages/inline-error';

import * as S from "./style";

class ForgotPasswordForm extends Component {

  state = {
    data: {
      email: '',
    },
    loading: false,
    errors: {}
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { data } = this.state;
    const errors = forgotPasswordValidation(data);
    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      this.setState({
        loading: true
      });
      this.props
        .submit(data)
        .catch(err => {
          this.setState({
            errors: err.response.data.errors,
            loading: false
          });
        });
    }
  };

  onChange = e => {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [e.target.name]: e.target.value
      }
    })
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <S.FormField error={ !!errors.email }>
          <S.Input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={this.onChange}
          />
          <InlineError text={ errors.email || ' ' } />
        </S.FormField>
        <S.Button>Continue</S.Button>
      </form>
    )
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
