// errors.js
const ErrorTypes = {
  INVALID_PARAM: "INVALID_PARAM",
  // otros tipos de error...
};

function errorMiddleware(err, req, res, next) {
  if (err.type === ErrorTypes.INVALID_PARAM) {
    return res
      .status(400)
      .json({ error: "Invalid parameter", message: err.message });
  }
  // manejar otros tipos de errores...
  next(err);
}

function validateUid(req, res, next) {
  const { uid } = req.params;

  if (!uid || isNaN(uid) || Number(uid) <= 0) {
    const error = new Error("The uid parameter must be a positive number.");
    error.type = ErrorTypes.INVALID_PARAM;
    return next(error);
  }

  next();
}

module.exports = { errorMiddleware, validateUid };
