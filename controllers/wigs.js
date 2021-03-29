const { createWIG } = require("../models/wigs");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");
const { getWig } = require("../services/wigs");

exports.createWIG = async (req, res, next) => {
  const wigId = uuidv4();
  const wigName = req.body.wigName;
  const lagName = req.body.lagName;
  const lagDataType = req.body.lagDataType;
  const lagInterval = req.body.lagInterval;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  try {
    await createWIG(
      wigId,
      wigName,
      lagName,
      lagDataType,
      lagInterval,
      startDate,
      endDate
    );
    const response = await getWig(wigId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
