const commentsRouter = require("express").Router();

const {
  postComments,
  getCommentsById,
  patchComment
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:article_id/comments")
  .post(postComments)
  .get(getCommentsById);

commentsRouter.route("/:comment_id").patch(patchComment);

module.exports = commentsRouter;
