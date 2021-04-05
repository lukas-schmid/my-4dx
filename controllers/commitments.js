const { createCommitment } = require("../models/commitments");
const { v4: uuidv4 } = require("uuid");
const service = require("../services/commitments");

exports.getAllCommitmentsByWigId = async (req, res, next) => {
  const wigId = req.params.wigId;
  try {
    const commitments = await service.getAllCommitmentsByWigId(wigId);
    if (!commitments) {
      res.status(404).json({ message: "not found" });
    } else {
      res.status(200).json(commitments);
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllCommitments = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const commitments = await service.getAllCommitments(userId);
    if (!commitments) {
      res.status(404).json({ message: "not found" });
    } else {
      res.status(200).json(commitments);
    }
  } catch (error) {
    next(error);
  }
};

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
    const response = await service.getCommitment(commitmentId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateCommitment = async (req, res, next) => {
  const commitmentId = req.params.commitmentId;
  const userId = req.body.userId;
  const commitmentName = req.body.commitmentName;
  const startDate = req.body.startDate;
  const wigId = req.body.wigId;
  const wigName = req.body.wigName;
  const leadId = req.body.leadId;
  const category = req.body.category;
  try {
    await service.updateCommitment(
      commitmentId,
      userId,
      commitmentName,
      startDate,
      wigId,
      wigName,
      leadId,
      category
    );
    const response = await service.getCommitment(commitmentId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.deleteCommitment = async (req, res, next) => {
  const commitmentId = req.params.commitmentId;
  try {
    await service.deleteCommitment(commitmentId);
    res
      .status(204)
      .json({ message: `Commitment with id ${commitmentId} has been deleted` });
  } catch (error) {
    next(error);
  }
};
