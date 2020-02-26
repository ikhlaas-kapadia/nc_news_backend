const { fetchArticleById } = require("../models/articles-model");
const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(articleObjectById => {
      res.status(200).send(articleObjectById);
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { getArticleById };
