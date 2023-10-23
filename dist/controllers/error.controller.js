"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorValidators_1 = require("../validators/ErrorValidators");
var errorController = function (error, req, res, next) {
  var validator = new ErrorValidators_1.ErrorValidator(res, error);
  next;
  console.log({ error: error });
  if (error.name === "ZodError") {
    return validator.zodValidator();
  }
  if (error.isOperational) {
    return validator.customValidator();
  }
  if (error.code === 11000) {
    return validator.mongoUniqueValidator();
  }
  if (error.name === "CastError") {
    return validator.mongoCastValidator();
  }
  if (error.name === "PayloadTooLargeError") {
    return validator.largePayload();
  } else {
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.default = errorController;
//# sourceMappingURL=error.controller.js.map
