const connection = require("../db/connection");

const insertComments = (articleId, username, commentBody) => {
  return connection("comments")
    .insert({ body: commentBody, author: username, article_id: articleId })
    .returning("*")
    .then(insertedComment => {
      return { comment: insertedComment[0] };
    });
};

const fetchCommentsById = articleId => {
  return connection
    .select("comment_id", "author", "votes", "created_at", "body")
    .from("comments")
    .where({ article_id: articleId })
    .then(comments => {
      return { comments: comments };
    });
};
module.exports = { insertComments, fetchCommentsById };

// exports.createTreasure = (newTreasure) => {
//     return connection.insert(newTreasure)
//         .into('treasures')
//         .returning('*')
// }
