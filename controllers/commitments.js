const { createCommitment } = require("../models/commitments");
const { v4: uuidv4 } = require("uuid");
const { getCommitment } = require("../services/commitments");

exports.createCommitment = async (req, res, next) => {
  const commitmentId = uuidv4();
  const userId = req.params.userId;
  const commitmentName = req.body.commitmentName;
  const startDate = req.body.startDate;
  const wigId = req.body.wigId;
  const wigName = req.body.wigName;
  const leadId = req.body.leadId;
  const category = req.body.category;
  try {
    await createCommitment(
      commitmentId,
      userId,
      commitmentName,
      startDate,
      wigId,
      wigName,
      leadId,
      category
    );
    const response = await getCommitment(commitmentId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
