const { createWIG } = require("../models/wigs");
const { v4: uuidv4 } = require("uuid");
const service = require("../services/wigs");
const userService = require('../services/users');
const {
  getFirstOfMonth,
  getMondayDate,
  addDays,
  addMonth,
  formatDate,
} = require("../helpers/helperfunctions");

exports.getWIGSByTeamId = async (req, res, next) => {
  const teamId = req.params.teamId;
  try {
    const users = await service.getAllWigsByTeamId(teamId);
    if (!users) {
      res.status(404).json({ message: "not found" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    next(err);
  }
};

exports.createWIG = async (req, res, next) => {
  const wigId = uuidv4();
  const wigName = req.body.wigName;
  const teamId = req.body.teamId;
  const lagName = req.body.lagName;
  const lagDataType = req.body.lagDataType;
  const lagCurrency = req.body.lagCurrency;
  const lagInterval = req.body.lagInterval;
  let startDate = req.body.startDate;
  const endDate = req.body.endDate;
  let lagData = [];
  const leadMeasures = [];

  if (lagInterval === "weekly") startDate = getMondayDate(startDate);
  if (lagInterval === "monthly") startDate = getFirstOfMonth(startDate);

  if (lagInterval === "weekly") {
    let whileArray = [];
    let date = new Date(startDate);
    while (date < new Date(endDate)) {
      whileArray.push({
        startDate: formatDate(date),
        goal: "",
        actual: "",
      });
      date = addDays(date, 7);
    }
    lagData = whileArray;
  }

  if (lagInterval === "monthly") {
    let whileArray = [];
    let date = new Date(startDate);
    while (date < new Date(endDate)) {
      whileArray.push({
        startDate: formatDate(new Date(date)),
        goal: "",
        actual: "",
      });
      date = addMonth(date);
    }
    lagData = whileArray;
  }

  try {
    await createWIG(
      wigId,
      wigName,
      teamId,
      lagName,
      lagDataType,
      lagCurrency,
      lagInterval,
      formatDate(startDate),
      endDate,
      lagData,
      leadMeasures
    );
    const response = await service.getWig(wigId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateWIG = async (req, res, next) => {
  const wigId = req.params.wigId;
  const wigName = req.body.wigName;
  const lagName = req.body.lagName;
  const lagDataType = req.body.lagDataType;
  const lagInterval = req.body.lagInterval;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  try {
    await service.updateWig(
      wigId,
      wigName,
      lagName,
      lagDataType,
      lagInterval,
      startDate,
      endDate
    );
    const response = await service.getWig(wigId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.deleteWIG = async (req, res, next) => {
  const wigId = req.params.wigId;
  try {
    const wig = await service.getWig(wigId);
    const teamId = wig.teamId;
    const users = await userService.getAllUsers(teamId);
    users.forEach(async user => {
      const newLeadMeasures = user.leadMeasures.filter(obj => obj.wigId !== wigId);
      await userService.addUserLeadMeasure(
        user.id,
        newLeadMeasures
      )
    })
    await service.deleteWig(wigId);

    res.status(204).json({ message: `WIG with id ${wigId} has been deleted` });
  } catch (error) {
    next(error);
  }
};
