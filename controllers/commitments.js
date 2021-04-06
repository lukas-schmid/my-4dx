const { v4: uuidv4 } = require("uuid");
const userService = require("../services/users")

exports.createCommitment = async (req, res, next) => {
  const userId = req.params.userId;
  const body = {
    commitmentId: uuidv4(),
    startDate: req.body.startDate,
    isCompleted: false,
    commitmentName: req.body.commitmentName
  }
  try {
    const user = await userService.getUser(userId);
    const currentCommitments = user.commitments;
    const newCommitments = currentCommitments.concat(body);
    await userService.addUserCommitments(
      user.id,
      newCommitments
    );
    const updatedUser = await userService.getUser(userId);
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
}


exports.updateCommitment = async (req, res, next) => {
  const commitmentId = req.params.commitmentId;
  const userId = req.params.userId;
  const body = [{
    commitmentId,
    startDate: req.body.startDate,
    isCompleted: req.body.isCompleted,
    commitmentName: req.body.commitmentName
  }];
  try {
    const user = await userService.getUser(userId);
    const commitments = user.commitments;
    const filteredCommitments = commitments.filter(commitment => commitment.commitmentId !== commitmentId);
    const newCommitments = filteredCommitments.concat(body);
    await userService.updateCommitment(
      userId,
      newCommitments
    );
    const response = await userService.getUser(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


exports.deleteCommitment = async (req, res, next) => {
  const commitmentId = req.params.commitmentId;
  const userId = req.params.userId;
  try {
    const user = await userService.getUser(userId);
    const commitments = user.commitments;
    const newCommitments = commitments.filter(commitment => commitment.commitmentId !== commitmentId);
    await userService.deleteCommitment(
      userId,
      newCommitments
    );
    const response = await userService.getUser(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
