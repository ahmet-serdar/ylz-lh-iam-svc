const { error } = require("@ylz/logger")
const { constants, errors, responses } = require("@ylz/common")

function errorHandler(nodeEnv) {
  return function errorHandler(err, req, res, next) {
    if (nodeEnv !== constants.EnvVar.TEST) {
      error(err);
    }

    let response;

    switch (err.type) {
      case errors.NotFoundError.name:
        response = new responses.NotFoundResponse();
        break;
      case errors.DbValidationError.name:
        response = new responses.UnprocessableResponse({
          data: err.data.map((e) => ({
            location: "",
            param: e.path,
            value: e.value,
            msg: e.message
          })),
          message: err.message
        });
        break;
      case errors.DuplicateKeyError.name:
        response = new responses.UnprocessableResponse({
          message: err.message
        });
        break;
      case errors.BadRequestError.name:
        response = new responses.BadRequestResponse({
          message: err.message
        });
        break;
      case errors.InternalServerError.name:
      default:
        if (err.name === "JwtParseError") {
          response = new responses.UnauthorizedResponse();
        } else if(err.response.status === 400) {
          response = new responses.BadRequestResponse();
        } else {
          response = new responses.InternalServerError();

        }
        break;
    }

    res.status(response.code).json(response);
  };
}

module.exports = { errorHandler }
