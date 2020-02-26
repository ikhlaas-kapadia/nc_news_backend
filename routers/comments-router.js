const commentsRouter = require("express").Router();

const { postComments } = require("../controllers/comments-controller");

commentsRouter.route("/:article_id/comments").post(postComments);

module.exports = commentsRouter;
