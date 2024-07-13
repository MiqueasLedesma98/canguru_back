const formatStack = (err) => {
  if (typeof err === "string") return { error: err };
  const whereIsError = err.stack.split("\n").map((e) => e.replace("\n", ""));
  return { error: err.message, location: whereIsError };
};

module.exports = {
  // eslint-disable-next-line no-unused-vars
  httpErrors: function (err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    console.error(err);
    return res.status(500).send(formatStack(err));
  },
};
