exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: "Invalid Path" });
  next();
};

exports.handleCustomError = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg });
  } else if (err.status === 400) {
    res.status(400).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlePsqlError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Input" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "ID not found" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Invalid Input" });
  } else if (err.code === "42703") {
    res.status(400).send({ msg: "Invalid query" });
  } else {
    next(err);
  }
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
  next();
};
