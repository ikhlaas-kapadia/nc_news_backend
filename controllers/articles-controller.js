const { fetchArticleById } = require("../models/articles-model");
const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  console.log(article_id, "from controller");
  fetchArticleById(article_id).then(articleObjectById => {
    console.log(articleObjectById, "from controller");
    res.status(200).send(articleObjectById);
  });
};

module.exports = { getArticleById };
