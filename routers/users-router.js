const userRouter = require("express").Router();
const { getUserById } = require("../controllers/users-controller");
const { handle405s } = require("../errors/errors");
userRouter
  .route("/:username")
  .get(getUserById)
  .all(handle405s);

module.exports = userRouter;
