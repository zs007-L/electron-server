exports.getResult = function (result) {
  return {
    code: 0,
    msg: "",
    data: result,
  };
};

exports.asyncHandler = function (handler) {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.send(exports.getResult(result));
    } catch (error) {
      next(error);
    }
  };
};
