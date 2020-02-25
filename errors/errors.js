exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: "Invalid Path" });
  next();
};

exports.handleCustomError = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Invalid Username" });
  } else {
    next(err);
  }
};
