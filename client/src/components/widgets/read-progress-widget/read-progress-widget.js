import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toastr } from 'react-redux-toastr';
import {
  updateProgress,
  updateProgressSuccess,
  updateProgressFailure
} from "../../../actions/books";

import * as S from "./style";
import progress from "../../../img/progress_full.png";
import accept from "../../../img/accept.png";

class ReadProgressWidget extends Component {
  state = {
    visibilityProgress: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  saveProgressClick = e => {
    e.preventDefault();
    const { pages, goodreadsId, page } = this.props;
    const readPages = parseInt(this.state.readPages);

    if ( isNaN(readPages) || readPages < 0 || readPages > pages ) {
      toastr.error('Error', "Invalid value");
      return
    } else {
      this.props.updateProgress(readPages, goodreadsId)
        .then(book => {
          this.setState({ visibilityProgress: false });
          this.props.updateProgressSuccess(book, page);
          toastr.success("Successful", "Changes installed successfully");
        })
        .catch(error => {
          this.props.updateProgressFailure(error);
          toastr.error('Server Error', error.response.data.error)
        });
    }
  };

  render() {
    const { pages, readPages } = this.props;
    const { visibilityProgress } = this.state;
    const value = readPages || 0;
    return (
      <span>
        {visibilityProgress ? (
          <>
            <S.Icon
              src={accept}
              onClick={this.saveProgressClick}
            />
            <S.Input
              type="text"
              name="readPages"
              id="readPages"
              defaultValue={value}
              onChange={this.onChange}
            />
            <span>/{pages}</span>
          </>
        ) : (
          <>
            <S.Icon
              src={progress}
              onClick={() => this.setState({ visibilityProgress: true })}
            />
            <span>{value}/{pages}</span>
          </>
      )}
      </span>
    );
  }
}

ReadProgressWidget.propTypes = {
  pages: PropTypes.number.isRequired,
  readPages: PropTypes.number.isRequired,
  goodreadsId: PropTypes.string.isRequired,
  inList: PropTypes.bool.isRequired
};

export default connect(
  null,
  { updateProgress, updateProgressSuccess, updateProgressFailure }
)(ReadProgressWidget);
