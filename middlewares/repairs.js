const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const { Repairs } = require("../models/reapairs");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const repairsPendingById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repairs.findOne({
    where: {
      id,
      status: "pending",
    },
  });

  if (!repair) {
    return next(new AppError("User doesnt repair given that id: " + id, 404));
  }

  req.repair = repair;
  next();
});

const createRepairValidations = [
  body("date")
    .notEmpty()
    .withMessage("The property date cannot be empty")
    .isDate()
    .withMessage("The date must be a valid date"),
  body("computerNumber")
    .notEmpty()
    .withMessage("The property computerNumber cannot be empty")
    .isInt()
    .withMessage("The property computerNumber must be a number"),
  body("comments")
    .notEmpty()
    .withMessage("The property comments cannot be empty")
    .isLength({
      min: 2,
      max: 150,
    })
    .withMessage("Comments must be between 2-150 characters")
    .isString()
    .withMessage("Comments must be a string"),
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

module.exports = {
  repairsPendingById,
  createRepairValidations,
  checkValidations,
};
