const topicsRouter = require("./topics-router");
const apiRouter = require("express").Router();
const userRouter = require("./users-router");
const articlesRouter = require("./articles-router");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
