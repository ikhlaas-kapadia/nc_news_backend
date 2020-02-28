const articlesRouter = require("express").Router();
const commentsRouter = require("./comments-router");
const {
  getArticleById,
  patchArticleById,
  getArticles
} = require("../controllers/articles-controller");
const { handle405s } = require("../errors/errors");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(handle405s);
articlesRouter
  .route("/")
  .get(getArticles)
  .all(handle405s);

articlesRouter.use(commentsRouter);

module.exports = articlesRouter;
