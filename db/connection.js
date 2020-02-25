const knex = require("knex");
const dbConfig = require("../knexfile");
const connection = knex(dbConfig);
// In knex it creates connection with databse automatically but in other files we need to create the connection
module.exports = connection;
