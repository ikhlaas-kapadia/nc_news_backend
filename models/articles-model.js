const connection = require("../db/connection");

const fetchArticleById = articleId => {
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", articleId)
    .count({ comment_count: "comments.article_id" })
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article ID does not exist"
        });
      } else {
        return { article: result[0] };
      }
    });
};

const updateArticleById = (articleId, voteChange) => {
  const { inc_votes } = voteChange;

  return connection("articles")
    .where("article_id", "=", articleId)
    .increment("votes", inc_votes)
    .then(() => {
      return connection("articles").where("article_id", "=", articleId);
    })
    .then(updatedArticle => {
      return { article: updatedArticle[0] };
    });
};

module.exports = { fetchArticleById, updateArticleById };
// func = () => {
//   return knex
//     .select("houses.*")
//     .from("houses")
//     .leftJoin("wizards", "houses.house_id", "=", "wizards.house_id")
//     .groupBy("houses.house_id")
//     .count({ wizards_count: "wizards.house_id" });
// };