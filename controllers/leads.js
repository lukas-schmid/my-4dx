const { createLead } = require("../models/leads");
const { v4: uuidv4 } = require("uuid");
const service = require("../services/leads");

exports.createLead = async (req, res, next) => {
  const leadId = uuidv4();
  const leadName = req.body.leadName;
  const leadInterval = req.body.leadInterval;
  const leadDataType = req.body.leadDataType;
  const benchmarkExists = req.body.benchmarkExists;
  const benchmark = req.body.benchmark;
  const leadData = [{ startDate: "", data: 0 }];
  try {
    await createLead(
      leadId,
      leadName,
      leadInterval,
      leadDataType,
      benchmarkExists,
      benchmark,
      leadData
    );
    const response = await service.getLead(leadId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateLead = async (req, res, next) => {
  const leadId = req.params.leadId;
  const leadName = req.body.leadName;
  const leadInterval = req.body.leadInterval;
  const leadDataType = req.body.leadDataType;
  const benchmarkExists = req.body.benchmarkExists;
  const benchmark = req.body.benchmark;
  const leadData = [
    {
      startDate: req.body.leadData[0].startDate,
      date: req.body.leadData[0].data,
    },
  ];
  try {
    await service.updateLead(
      leadId,
      leadName,
      leadInterval,
      leadDataType,
      benchmarkExists,
      benchmark,
      leadData
    );
    const response = await service.getLead(leadId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

exports.deleteLead = async (req, res, next) => {
  const leadId = req.params.leadId;
  try {
    await service.deleteLead(leadId);
    res
      .status(204)
      .json({ message: `Lead with id ${leadId} has been deleted` });
  } catch (error) {
    next(error);
  }
};
