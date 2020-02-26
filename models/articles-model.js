const connection = require("../db/connection");

const fetchArticleById = articleId => {
  console.log(articleId, "from models");
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", articleId)
    .count({ comment_count: "comments.article_id" })
    .then(result => {
      return { article: result[0] };
    });
};

module.exports = { fetchArticleById };
// func = () => {
//   return knex
//     .select("houses.*")
//     .from("houses")
//     .leftJoin("wizards", "houses.house_id", "=", "wizards.house_id")
//     .groupBy("houses.house_id")
//     .count({ wizards_count: "wizards.house_id" });
// };
