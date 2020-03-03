const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);
      const usersInsertions = knex("users").insert(userData);
      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const modifiedArticleData = formatDates(articleData);
      return knex("articles")
        .insert(modifiedArticleData)
        .returning("*");
    })
    .then(modifiedArticles => {
      const refObj = makeRefObj(modifiedArticles);
      const formattedCommentsData = formatComments(commentData, refObj);
      return knex("comments").insert(formattedCommentsData);
    });
};
