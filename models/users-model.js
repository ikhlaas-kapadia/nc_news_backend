const connection = require("../db/connection");

const fetchUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid Username" });
      } else {
        return { user: user[0] };
      }
    });
};

module.exports = { fetchUserById };
