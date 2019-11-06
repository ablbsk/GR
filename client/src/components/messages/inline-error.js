import React from 'react';
import PropTypes from 'prop-types';

const InlineError = ({ text }) => {
  return (text !== ' '
      ? <span style={{ color: '#ff4040' }}>{ text }</span>
      : <span style={{ visibility: "hidden" }}>hidden</span>
  )
};

InlineError.propTypes = {
  text: PropTypes.string.isRequired
};

export default InlineError;
