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

const fetchArticles = (
  sortBy = "created_at",
  order = "desc",
  author,
  topic
) => {
  console.log(order);
  if (order === "asc" || order === "desc" || order === undefined) {
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
        .modify(queryBuilder => {
          if (author !== undefined) {
            queryBuilder.where("articles.author", author);
          }
        })
        .modify(queryBuilder => {
          if (topic !== undefined) {
            queryBuilder.where("articles.topic", topic);
          }
        })
        .orderBy(sortBy, order)
        .count({ comment_count: "comments.article_id" })
        .then(formattedArticles => {
          if (formattedArticles.length === 0) {
            console.log(formattedArticles, "---->");
            return connection
              .select("*")
              .from("topics")
              .where("topic", topic)
              .then(articleTopic => {
                console.log(articleTopic, "****");
                if (articleTopic.length === 0) {
                  return Promise.reject({
                    status: 404,
                    msg: "topic does not exist"
                  });
                } else {
                  return { articles: formattedArticles };
                }
              });
          } else {
            return { articles: formattedArticles };
          }
        })
    );
  } else {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }
};

module.exports = { fetchArticleById, updateArticleById, fetchArticles };

// .modify(queryBuilder => {
//   if (house_id !== undefined) {
//     queryBuilder.where("houses.house_id", house_id);
//   }
// })

// // console.log(comments, "from model");
// if (comments.length === 0) {
//   return connection
//     .select("article_id")
//     .from("articles")
//     .where({ article_id: articleId })
//     .then(article => {
//       if (article.length === 0) {
//         return Promise.reject({ status: 404, msg: "ID not found" });
//       } else {
//         return { comments: comments };
//       }
//     });
// } else {
//   return { comments: comments };
