const {
  fetchArticleById,
  updateArticleById
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

  updateArticleById(article_id, req.body).then(updatedArticle => {
    console.log(updatedArticle, "from controller");
    res.status(200).send(updatedArticle);
  });
};

module.exports = { getArticleById, patchArticleById };
