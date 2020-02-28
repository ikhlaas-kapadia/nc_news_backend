const commentsRouter = require("express").Router();

const {
  postComments,
  getCommentsById,
  patchComment,
  deleteComment
} = require("../controllers/comments-controller");
const { handle405s } = require("../errors/errors");

commentsRouter
  .route("/:article_id/comments")
  .post(postComments)
  .get(getCommentsById)
  .all(handle405s);

commentsRouter
  .route("/:comment_id")
  .patch(patchComment)
  .delete(deleteComment)
  .all(handle405s);

module.exports = commentsRouter;
