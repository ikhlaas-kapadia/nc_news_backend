const {
  insertComments,
  fetchCommentsById,
  updateComment,
  removeComment
} = require("../models/comments-model");

const postComments = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  insertComments(article_id, username, body)
    .then(comments => {
      res.status(201).send(comments);
    })
    .catch(err => {
      next(err);
    });
};

const getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  fetchCommentsById(article_id, sort_by, order)
    .then(comments => {
      // console.log(comments, "from controller");
      res.status(200).send(comments);
    })
    .catch(err => {
      // console.log(err, "from controller");
      next(err);
    });
};

const patchComment = (req, res, next) => {
  const { comment_id } = req.params;

  console.log();

  updateComment(comment_id, req.body)
    .then(updatedComment => {
      res.status(200).send(updatedComment);
    })
    .catch(err => {
      next(err);
    });
};

const deleteComment = (req, res, next) => {
  // console.log(req.params);
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(deletedComment => {
      // console.log(deletedComment);
      //We send empty () so that the promise can be resolved.
      res.status(204).send();
    })
    .catch(err => {
      // console.log(err);
      next(err);
    });
};

module.exports = { postComments, getCommentsById, patchComment, deleteComment };
