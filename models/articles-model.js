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
  if (Object.keys(voteChange).length === 0) {
    return Promise.reject({ status: 400, msg: "Invalid request format" });
  } else {
    return connection("articles")
      .where("article_id", "=", articleId)
      .increment("votes", inc_votes)
      .then(() => {
        return connection("articles").where("article_id", "=", articleId);
      })
      .then(updatedArticle => {
        if (updatedArticle.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Article ID does not exist"
          });
        } else {
          return { article: updatedArticle[0] };
        }
      });
  }
};

const fetchArticles = () => {
  return (
    connection
      //articles.* is same as saying articles.article_id and all the other columns
      //When joining tables we need to be explicit in specifcying columns. If we say article_id it doesn't know which table to reference from since we are joining tables
      .select(
        "articles.article_id",
        "articles.title",
        "articles.votes",
        "articles.topic",
        "articles.author",
        "articles.created_at"
      )
      .from("articles")
      .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
      .groupBy("articles.article_id")
      .count({ comment_count: "comments.article_id" })
      .then(formattedArticles => {
        return { articles: formattedArticles };
      })
  );
};

module.exports = { fetchArticleById, updateArticleById, fetchArticles };
