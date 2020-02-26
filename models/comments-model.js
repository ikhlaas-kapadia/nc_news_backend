const connection = require("../db/connection");

const insertComments = (articleId, username, commentBody) => {
  return connection("comments")
    .insert({ body: commentBody, author: username, article_id: articleId })
    .returning("*")
    .then(insertedComment => {
      return { comment: insertedComment[0] };
    });
};

module.exports = { insertComments };

// exports.createTreasure = (newTreasure) => {
//     return connection.insert(newTreasure)
//         .into('treasures')
//         .returning('*')
// }
