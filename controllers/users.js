const { User } = require("../models/user");

const { catchAsync } = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({
    users,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const selectUser = await User.findOne({
    where: { id },
  });

  res.status(200).json({
    selectUser,
  });
});

const addNewUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    newUser,
  });
});

const updateUserById = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateUser = await User.findOne({
      where: { id },
    });

    await updateUser.update({
      name,
      email,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const deleteUser = await User.findOne({
      where: { id },
    });

    await deleteUser.update({
      status: "disable",
    });

    res.status(200).json({
      status: "success",
    });
});

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
};
