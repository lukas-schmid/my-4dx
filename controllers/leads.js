const { createLead } = require("../models/leads");
const { v4: uuidv4 } = require("uuid");
//const db = require("../config/db");
const { getLead } = require("../services/leads");

exports.createLead = async (req, res, next) => {
  const leadId = uuidv4();
  const leadName = req.body.leadName;
  const leadInterval = req.body.leadInterval;
  const leadDataType = req.body.leadDataType;
  const benchmarkExists = req.body.benchmarkExists;
  const benchmark = req.body.benchmark;
  try {
    await createLead(
      leadId,
      leadName,
      leadInterval,
      leadDataType,
      benchmarkExists,
      benchmark
    );
    const response = await getLead(leadId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
