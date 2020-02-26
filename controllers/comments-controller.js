const {
  insertComments,
  fetchCommentsById
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
      res.status(200).send(comments);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { postComments, getCommentsById };
