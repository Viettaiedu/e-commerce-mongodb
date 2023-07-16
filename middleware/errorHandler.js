const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Một số lỗi máy chủ, vui lòng thử lại sau",
  };
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    if (typeof err.value === "object") {
      customError.message = `Không tìm thấy với id : ${
        Object.values(err.value)[0]
      }`;
    } else {
      customError.message = `Không tìm thấy với id : ${err.value}`;
    }
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandlerMiddleware;
