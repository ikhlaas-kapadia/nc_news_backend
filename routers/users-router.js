const userRouter = require("express").Router();
const { getUserById } = require("../controllers/users-controller");

userRouter.get("/:username", getUserById);

module.exports = userRouter;
