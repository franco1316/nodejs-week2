const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const { User } = require("../models/user");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return next(new AppError("User doesnt exist given that id: " + id, 404));
  }
  req.user;
  next();
});

const createUserValidations = [
  body("name").notEmpty().withMessage("The property name cannot be empty"),
  body("email")
    .notEmpty()
    .withMessage("The property email cannot be empty")
    /*
    .isEmail()
    .withMessage("Email must be in a valid format")*/
    //is email mas bien impide que ponga bien el email
    ,
  body("password")
    .notEmpty()
    .withMessage("The property password cannot be empty")
    .isLength({
      min: 8,
    })
    .withMessage("Password must be at least 8 characters"),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const eMessages = messages.join(".\n");
    return res.status(400).json({
      status: "error",
      message: eMessages,
    });
  }
  next();
};


module.exports = { userExist, createUserValidations, checkValidations };
