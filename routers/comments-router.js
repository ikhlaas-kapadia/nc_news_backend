const commentsRouter = require("express").Router();

const {
  postComments,
  getCommentsById
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:article_id/comments")
  .post(postComments)
  .get(getCommentsById);

module.exports = commentsRouter;
