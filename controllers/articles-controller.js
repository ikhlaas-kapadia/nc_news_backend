const {
  fetchArticleById,
  updateArticleById,
  fetchArticles,
} = require("../models/articles-model");

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((articleObjectById) => {
      res.status(200).send(articleObjectById);
    })
    .catch((err) => {
      next(err);
    });
};

const patchArticleById = (req, res, next) => {
  const { article_id } = req.params;

  updateArticleById(article_id, req.body)
    .then((updatedArticle) => {
      res.status(200).send(updatedArticle);
    })
    .catch((err) => {
      next(err);
    });
};

const getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;

  fetchArticles(sort_by, order, author, topic)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticleById, patchArticleById, getArticles };
