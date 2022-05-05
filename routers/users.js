const express = require("express");

const { userExist, checkValidations } = require("../middlewares/user");
const { createUserValidations } = require("../middlewares/user");

const {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createUserValidations, checkValidations, addNewUser);

router
  .route("/:id")
  .get(userExist, getUserById)
  .patch(userExist, updateUserById)
  .delete(userExist, deleteUserById);

module.exports = { users: router };
