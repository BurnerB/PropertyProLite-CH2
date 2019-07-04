class Responses {
  static authsuccess(statusCode, message, token, data, res) {
    res.status(statusCode).json({
      status: message,
      data,
      token,
    });
  }

  static handleSuccess(statusCode, data, res) {
    res.status(statusCode).json({
      status: 'success',
      data,
    });
  }

  static success(statusCode, message, res) {
    res.status(statusCode).json({
      status: 'success',
      message,
    });
  }

  static handleError(statusCode, message, res) {
    res.status(statusCode).json({
      status: 'Error',
      message,
    });
  }

  static validationError(statusCode, data, res) {
    res.status(statusCode).json({
      status: 'Error',
      data,
    });
  }

  static catchError(statusCode, data, res) {
    res.status(statusCode).json({
      status: 'Error',
      data,
    });
  }

}

export default Responses;
