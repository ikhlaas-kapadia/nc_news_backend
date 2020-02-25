const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const { handle404s, handleCustomError } = require("./errors/errors");

app.use("/api", apiRouter);
app.use("/*", handle404s);
app.use(handleCustomError);
module.exports = app;
