const commentsRouter = require("express").Router();

const {
  postComments,
  getCommentsById,
  patchComment,
  deleteComment
} = require("../controllers/comments-controller");

commentsRouter
  .route("/:article_id/comments")
  .post(postComments)
  .get(getCommentsById);

commentsRouter
  .route("/:comment_id")
  .patch(patchComment)
  .delete(deleteComment);

module.exports = commentsRouter;
