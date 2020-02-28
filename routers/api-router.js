const topicsRouter = require("./topics-router");
const apiRouter = require("express").Router();
const userRouter = require("./users-router");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const { handle405s } = require("../errors/errors");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.route("/").all(handle405s);

module.exports = apiRouter;
