const { getTopics } = require("../controllers/topics-controller");
const { handle405s } = require("../errors/errors");

const topicsRouter = require("express").Router();
topicsRouter
  .route("/")
  .get(getTopics)
  .all(handle405s);

module.exports = topicsRouter;
