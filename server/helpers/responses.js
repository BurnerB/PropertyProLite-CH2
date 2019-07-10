class Responses {
  static authsuccess(statusCode, message, token, data, res) {
    res.status(statusCode).json({
      status: statusCode,
      data,
      token,
    });
  }

  static handleSuccess(statusCode, data, res) {
    res.status(statusCode).json({
      status: statusCode ,
      data,
    });
  }

  static success(statusCode, message, res) {
    res.status(statusCode).json({
      status: statusCode,
      data: message,
    });
  }

  static handleError(statusCode, message, res) {
    res.status(statusCode).json({
      status: statusCode,
      error: message,
    });
  }

  static validationError(statusCode, data, res) {
    res.status(statusCode).json({
      status: statusCode,
      error: data,
    });
  }

  static catchError(statusCode, data, res) {
    res.status(statusCode).json({
      status: statusCode,
      error: data,
    });
  }

}

export default Responses;
