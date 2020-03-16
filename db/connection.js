const ENV = process.env.NODE_ENV || "development";
const knex = require("knex");

const dbConfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DATABASE_URL }
    : require("../knexfile");

module.exports = knex(dbConfig);
// const connection = knex(dbConfig);
// In knex it creates connection with databse automatically but in other files we need to create the connection
// module.exports = connection;
