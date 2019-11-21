import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

import ConfirmationContent from "../../components/contents/confirmation-content/confirmation-content";

class ConfirmationPage extends Component {

  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => {
        this.setState({
          loading: false,
          success: true
        })
      })
      .catch(() => {
        this.setState({
          loading: false,
          success: false
        })
      });
  }

  render() {
    const { loading, success } = this.state;

    return <ConfirmationContent loading={loading} success={success} />
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);
