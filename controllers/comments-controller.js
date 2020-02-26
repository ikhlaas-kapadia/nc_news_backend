const { insertComments } = require("../models/comments-model");

const postComments = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  insertComments(article_id, username, body)
    .then(comments => {
      console.log(comments);
      res.status(201).send(comments);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { postComments };
