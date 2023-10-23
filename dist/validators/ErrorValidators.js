"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorValidator = void 0;
var ErrorValidator = /** @class */ (function () {
  function ErrorValidator(res, error) {
    this.res = res;
    this.error = error;
    this.res = res;
    this.error = error;
  }
  ErrorValidator.prototype.zodValidator = function () {
    var errors = this.error.errors;
    var message = errors
      .map(function (error) {
        return error.message;
      })
      .join(",");
    return this.res
      .status(400)
      .json({ status: "invalid_input", message: message, statusCode: 400 });
  };
  ErrorValidator.prototype.customValidator = function () {
    var error = this.error;
    var message = error.message;
    var statusCode = error.statusCode;
    return this.res.status(error.statusCode).json({
      status: error.status,
      message: message,
      statusCode: statusCode,
    });
  };
  ErrorValidator.prototype.mongoUniqueValidator = function () {
    var message = "Duplicate key error. Data already exits";
    return this.res.status(400).json({
      status: "error",
      message: message,
    });
  };
  ErrorValidator.prototype.mongoCastValidator = function () {
    return this.res
      .status(400)
      .json({ message: "Invalid Data type,Kindly Check the data passed" });
  };
  ErrorValidator.prototype.largePayload = function () {
    return this.res
      .status(413)
      .json({ status: "error", message: "File too Large" });
  };
  return ErrorValidator;
})();
exports.ErrorValidator = ErrorValidator;
//# sourceMappingURL=ErrorValidators.js.map
