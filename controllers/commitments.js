const { v4: uuidv4 } = require("uuid");
const userService = require("../services/users")
// const {
//   getMondayDate,
//   addDays,
//   addDay,
//   formatDate,
// } = require("../helpers/helperfunctions");

// delete!
// const initCommitmentData = async (wigId, leadInterval) => {
//   const wig = await wigService.getWig(wigId);
//   const endDate = new Date(wig.endDate);
//   let startDate = new Date(wig.startDate);
//   let commitments = [];

//   if (leadInterval === "weekly") startDate = getMondayDate(startDate);

//   if (leadInterval === "daily") {
//     let whileArray = [];
//     let date = new Date(startDate);
//     while (date < new Date(endDate)) {
//       whileArray.push({
//         commitmentName: "",
//         isCompleted: false,
//         category: "",
//         startDate: formatDate(new Date(date))
//       });
//       date = addDay(date);
//     }
//     commitments = whileArray;
//   }

//   if (leadInterval === "weekly") {
//     let whileArray = [];
//     let date = new Date(startDate);
//     while (date < new Date(endDate)) {
//       whileArray.push({
//         commitmentName: "",
//         isCompleted: false,
//         category: "",
//         startDate: formatDate(new Date(date))
//       });
//       date = addDays(date, 7);
//     }
//     commitments = whileArray;
//   }
//   return commitments;
// };


// delete!
// exports.getAllCommitmentsByWigId = async (req, res, next) => {
//   const wigId = req.params.wigId;
//   try {
//     const commitments = await service.getAllCommitmentsByWigId(wigId);
//     if (!commitments) {
//       res.status(404).json({ message: "not found" });
//     } else {
//       res.status(200).json(commitments);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// delete!
// exports.getAllCommitments = async (req, res, next) => {
//   const userId = req.params.userId;
//   try {
//     const commitments = await service.getAllCommitments(userId);
//     if (!commitments) {
//       res.status(404).json({ message: "not found" });
//     } else {
//       res.status(200).json(commitments);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

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
