const {
  fetchArticleById,
  updateArticleById,
  fetchArticles
} = require("../models/articles-model");

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

const patchArticleById = (req, res, next) => {
  const { article_id } = req.params;

  updateArticleById(article_id, req.body)
    .then(updatedArticle => {
      res.status(200).send(updatedArticle);
    })
    .catch(err => {
      next(err);
    });
};

const getArticles = (req, res, next) => {
  fetchArticles().then(articles => {
    res.status(200).send(articles);
    console.log(articles, "from controller");
  });
};

module.exports = { getArticleById, patchArticleById, getArticles };
