class Responses {
  static authsuccess(statusCode, message,data, res) {
    res.status(statusCode).json({
      status: statusCode,
      message:message,
      data,
    });
  }

  static handleSuccess(statusCode, message,data, res) {
    res.status(statusCode).json({
      status: statusCode ,
      message:message,
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
