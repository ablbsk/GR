const _ = require('lodash');

function createError (errors) {
  const result = {};
  _.forEach(errors, (val, key) => {
    result[key] = val.message;
  });
  return result;
}

module.exports = createError;
