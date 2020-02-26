const articlesRouter = require("express").Router();
const commentsRouter = require("./comments-router");
const {
  getArticleById,
  patchArticleById,
  postComments
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter.use(commentsRouter);

module.exports = articlesRouter;
