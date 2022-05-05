const express = require("express");

const {
  repairsPendingById,
  checkValidations,
} = require("../middlewares/repairs");
const { createRepairValidation } = require("../middlewares/repairs");

const {
  getAllRepairs,
  getRepairById,
  addRepair,
  updateRepairById,
  deleteRepairById,
} = require("../controllers/repairs");

const router = express.Router();

router
  .route("/")
  .get(getAllRepairs)
  .post(createRepairValidation, checkValidations, addRepair);

router
  .route(":id")
  .get(repairsPendingById, getRepairById)
  .patch(repairsPendingById, updateRepairById)
  .delete(repairsPendingById, deleteRepairById);

module.exports = { repairs: router };
