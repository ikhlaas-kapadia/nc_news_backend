const connection = require("../db/connection");

const insertComments = (articleId, username, commentBody) => {
  if (username === undefined || commentBody === undefined) {
    return Promise.reject({ status: 400, msg: "Invalid Input" });
  } else {
    return connection("comments")
      .insert({ body: commentBody, author: username, article_id: articleId })
      .returning("*")
      .then(insertedComment => {
        return { comment: insertedComment[0] };
      });
  }
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

const updateComment = (commentId, voteChange) => {
  let { inc_votes } = voteChange;

  if (inc_votes === undefined) {
    inc_votes = 0;
  }
  console.log(voteChange, inc_votes);
  return connection("comments")
    .where("comment_id", "=", commentId)
    .increment("votes", inc_votes)
    .then(() => {
      return connection("comments").where("comment_id", "=", commentId);
    })
    .then(updatedComment => {
      if (updatedComment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Comment ID does not exist"
        });
      } else {
        return { comment: updatedComment[0] };
      }
    });
};

const removeComment = id => {
  return connection("comments")
    .where("comment_id", id)
    .del()
    .returning("*")
    .then(deletedComment => {
      if (deletedComment.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Comment ID does not exist"
        });
      }
    });
};
module.exports = {
  insertComments,
  fetchCommentsById,
  updateComment,
  removeComment
};
/*
once empty array is returned
we generate the table for artiles and check if valid id.
select * from articles where articleid = id
*/
