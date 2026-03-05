function success(data) {
  return {
    success: true,
    data: data,
    error: null
  };
}

function failure(error) {
  return {
    success: false,
    data: null,
    error: error
  };
}

module.exports = {
  success,
  failure
};
