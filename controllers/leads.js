const { v4: uuidv4 } = require("uuid");
const leadService = require("../services/leads");
const wigService = require("../services/wigs");
const userService = require("../services/users");
const {
  getMondayDate,
  addDays,
  addDay,
  formatDate,
} = require("../helpers/helperfunctions");

const initLeadData = async (wigId, leadInterval) => {
  const wig = await wigService.getWig(wigId);
  const endDate = new Date(wig.endDate);
  let startDate = new Date(wig.startDate);
  let leadData = [];

  if (leadInterval === "weekly") startDate = getMondayDate(startDate);

  if (leadInterval === "daily") {
    let whileArray = [];
    let date = new Date(startDate);
    while (date < new Date(endDate)) {
      whileArray.push({
        startDate: formatDate(new Date(date)),
        data: 0,
      });
      date = addDay(date);
    }
    leadData = whileArray;
  }

  if (leadInterval === "weekly") {
    let whileArray = [];
    let date = new Date(startDate);
    while (date < new Date(endDate)) {
      whileArray.push({
        startDate: formatDate(date),
        data: 0,
      });
      date = addDays(date, 7);
    }
    leadData = whileArray;
  }
  return leadData;
};

exports.createLead = async (req, res, next) => {
  const wigId = req.params.wigId;
  const leadId = uuidv4();
  //const leadData = await initLeadData(wigId, req.body.leadInterval);
  const leadMeasures = [
    {
      leadId,
      leadName: req.body.leadName,
      leadInterval: req.body.leadInterval,
      leadDataType: req.body.leadDataType,
      benchmarkExists: req.body.benchmarkExists,
      benchmark: req.body.benchmark,
   //   leadData: leadData,
    },
  ];
  try {
    const wig = await wigService.getWig(wigId);
    const currentLeadMeasures = wig.leadMeasures;
    const newLeadMeasures = currentLeadMeasures.concat(leadMeasures);
    await leadService.addLeadToWig(wigId, newLeadMeasures);
    const response = await wigService.getWig(wigId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};



exports.addUserLeadMeasure = async (req, res, next) => {
  const wigId = req.params.wigId;
  const leadId = req.params.leadId;
  const userId = req.params.userId;
  const leadData = await initLeadData(wigId, req.body.leadInterval);
  const leadMeasures = [
    {
      leadId: leadId,
      leadData
    },
  ]
  try {
    const user = await userService.getUser(userId);
    const currentLeadMeasures = user.leadMeasures;
    const newLeadMeasures = currentLeadMeasures.concat(leadMeasures);
    await userService.addUserLeadMeasure(
      user.id,
      newLeadMeasures
    );
    const updatedUser = await userService.getUser(userId);
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// exports.updateLead = async (req, res, next) => {
//   const wigId = req.params.wigId;
//   const leadId = req.params.leadId;
//   const leadMeasures = [
//     {
//       leadId: req.params.leadId,
//       leadName: req.body.leadName,
//       leadInterval: req.body.leadInterval,
//       leadDataType: req.body.leadDataType,
//       benchmarkExists: req.body.benchmarkExists,
//       benchmark: req.body.benchmark,
//       leadData: [
//         {
//           startDate: req.body.leadData[0].startDate,
//           date: req.body.leadData[0].data,
//         },
//       ],
//     },
//   ];
//   try {
//     const wig = await wigService.getWig(wigId);
//     const currentLeadMeasures = wig.leadMeasures;
//     const filteredLeadMeasures = currentLeadMeasures.filter(
//       (obj) => obj.leadId !== leadId
//     );
//     const newLeadMeasures = filteredLeadMeasures.concat(leadMeasures);
//     await leadService.addLeadToWig(wigId, newLeadMeasures);
//     const response = await wigService.getWig(wigId);
//     res.status(200).json(response);
//   } catch (error) {
//     next(error);
//   }
// };

exports.deleteLead = async (req, res, next) => {
  const wigId = req.params.wigId;
  const leadId = req.params.leadId;
  try {
    const wig = await wigService.getWig(wigId);
    const currentLeadMeasures = wig.leadMeasures;
    const newLeadMeasures = currentLeadMeasures.filter(
      (obj) => obj.leadId !== leadId
    );
    await leadService.addLeadToWig(wigId, newLeadMeasures);
    res
      .status(204)
      .json({ message: `Lead with id ${leadId} has been deleted` });
  } catch (error) {
    next(error);
  }
};
