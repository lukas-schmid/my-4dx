//const { createCommitment } = require("../models/commitments");
const { v4: uuidv4 } = require("uuid");
//const service = require("../services/commitments");
//const wigService = require("../services/wigs");
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
    category: req.body.category,
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

// delete!
// exports.updateCommitment = async (req, res, next) => {
//   const commitmentId = req.params.commitmentId;
//   const userId = req.body.userId;
//   const commitmentName = req.body.commitmentName;
//   const startDate = req.body.startDate;
//   const wigId = req.body.wigId;
//   const wigName = req.body.wigName;
//   const leadId = req.body.leadId;
//   const category = req.body.category;
//   const isCompleted = req.body.isCompleted;
//   try {
//     await service.updateCommitment(
//       commitmentId,
//       userId,
//       commitmentName,
//       startDate,
//       wigId,
//       wigName,
//       leadId,
//       category,
//       isCompleted
//     );
//     const response = await service.getCommitment(commitmentId);
//     res.status(201).json(response);
//   } catch (error) {
//     next(error);
//   }
// };


// delete!
// exports.deleteCommitment = async (req, res, next) => {
//   const commitmentId = req.params.commitmentId;
//   try {
//     await service.deleteCommitment(commitmentId);
//     res
//       .status(204)
//       .json({ message: `Commitment with id ${commitmentId} has been deleted` });
//   } catch (error) {
//     next(error);
//   }
// };
