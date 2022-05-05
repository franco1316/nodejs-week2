const { Repairs } = require("../models/reapairs");

const { catchAsync } = require("../utils/catchAsync");

const getAllRepairs = catchAsync(async (req, res) => {
  const allRepairs = await Repairs.findAll({
    where: { status: "pending" },
  });

  res.status(200).json({
    allRepairs,
  });
});

const getRepairById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const repair = await Repairs.findOne({
    where: {
      status: "pending",
      id,
    },
  });

  res.status(200).json({
    repair,
  });
});

const addRepair = catchAsync(async (req, res) => {
  const { date, userId } = req.body;

  const newRepair = await Repairs.create({
    date,
    userId,
  });

  res.status(201).json({
    newRepair,
  });
});

const updateRepairById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updateRepair = await Repairs.findOne({
    where: {
      status: "pending",
      id,
    },
  });

  await updateRepair.update({
    status: "completed",
  });

  res.status(200).json({
    status: "success",
  });
});

const deleteRepairById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const deleteRepair = await Repairs.findOne({
    where: {
      status: "pending",
      id,
    },
  });

  await deleteRepair.update({
    status: "cancelled",
  });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  getAllRepairs,
  getRepairById,
  addRepair,
  updateRepairById,
  deleteRepairById,
};
