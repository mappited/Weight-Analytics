

class Exception extends Error {
  static CODE = -1;
  static MESSAGE = "base error";
  constructor({ code, message, appErrorCode } = {}) {
    super(message);
    this.message = this.message || this.constructor.MESSAGE;
    this.code = code || this.constructor.CODE;
    this.appErrorCode = appErrorCode || Exception.CODE;
  }
  toJSON() {
    return {
      code: this.code,
      message: this.message,
      "application_error_code": this.appErrorCode
    };
  }
}

class ClientError extends Exception {}
class ServerError extends Exception {}

class EstabDBCError extends ServerError {
  static CODE = 'ESTAB_DBC_ERR';
  static MESSAGE = "Error establishing a database connection";
}


class EmailError extends ClientError {
  static CODE = 'EMAIL_ADDR_ERR';
  static MESSAGE = "Invalid email address";
}

class PasswordIsNotSecure extends ClientError {
  static CODE = "PASSWD_SEC_ERROR";
  static MESSAGE = "Password is not secure";
}

class InvalidCredentialsError extends ClientError {
  static CODE = "INVALID_CRDNT_ERR";
  static MESSAGE = "Invalid credentials"
}

class AccuntAlreadyExistsError extends ClientError { 
  static CODE = "ACCOUNT_ALREADY_EXISTS";
  static MESSAGE = "Account already exits"
}



class HTTPError extends Exception {
  static CODE = 500;
  static MESSAGE = "internal server error";
  static toHTTPError(error) {
    const data = { message: error.message, appErrorCode: error.code };
    if (error instanceof EmailError) {
      Object.assign(data, { code: 400 });
    } else if (
      error instanceof InvalidCredentialsError ||
      error instanceof AccuntAlreadyExistsError ||
      error instanceof PasswordIsNotSecure
    ) {
      Object.assign(data, { code: 401 });
    } else if (error instanceof EstabDBCError) {
      Object.assign(data, { code: 500 });
    } 
    return new HTTPError(data);
  }
}

module.exports = {
  Exception,
  ClientError,
  PasswordIsNotSecure,
  ServerError,
  EmailError,
  EstabDBCError,
  AccuntAlreadyExistsError,
  HTTPError
}
