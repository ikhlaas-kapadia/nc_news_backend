const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./routers/api-router");
const {
  handle404s,
  handleCustomError,
  handlePsqlError
} = require("./errors/errors");
app.use(cors());

app.use(express.json());
app.use("/api", apiRouter);
app.use("/*", handle404s);
app.use(handleCustomError);
app.use(handlePsqlError);
module.exports = app;
