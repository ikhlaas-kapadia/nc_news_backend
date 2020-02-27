const connection = require("../db/connection");

const insertComments = (articleId, username, commentBody) => {
  return connection("comments")
    .insert({ body: commentBody, author: username, article_id: articleId })
    .returning("*")
    .then(insertedComment => {
      return { comment: insertedComment[0] };
    });
};

const fetchCommentsById = (
  articleId,
  sortBy = "created_at",
  order = "desc"
) => {
  if (order === "asc" || order === "desc" || order === undefined) {
    return connection
      .select("comment_id", "author", "votes", "created_at", "body")
      .from("comments")
      .where({ article_id: articleId })
      .orderBy(sortBy, order)
      .then(comments => {
        // console.log(comments, "from model");
        if (comments.length === 0) {
          return connection
            .select("article_id")
            .from("articles")
            .where({ article_id: articleId })
            .then(article => {
              if (article.length === 0) {
                return Promise.reject({ status: 404, msg: "ID not found" });
              } else {
                return { comments: comments };
              }
            });
        } else {
          return { comments: comments };
        }
      });
  } else {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }
};
module.exports = { insertComments, fetchCommentsById };
/*
once empty array is returned
we generate the table for artiles and check if valid id.
select * from articles where articleid = id
*/

describe("", () => {});
