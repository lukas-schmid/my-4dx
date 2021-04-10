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
  const leadMeasures = [
    {
      leadId,
      leadName: req.body.leadName,
      leadInterval: req.body.leadInterval,
      leadDataType: req.body.leadDataType,
      benchmarkExists: req.body.benchmarkExists,
      benchmark: req.body.benchmark,
    },
  ];

  const leadData = await initLeadData(wigId, req.body.leadInterval);
  const leadUserMeasures = [
      {
        leadId: leadId,
        leadData,
        wigId
      },
    ]

  try {
    const wig = await wigService.getWig(wigId);
    const currentLeadMeasures = wig.leadMeasures;
    const newLeadMeasures = currentLeadMeasures.concat(leadMeasures);
    await leadService.addLeadToWig(wigId, newLeadMeasures);
    
    //add leadMeasures to all teamMembers
    
    const teamId = wig.teamId;
    const users = await userService.getAllUsers(teamId);
    users.forEach(async user => {
    const currentUserLeadMeasures = user.leadMeasures;
    const newUserLeadMeasures = currentUserLeadMeasures.concat(leadUserMeasures);
    await userService.addUserLeadMeasure(
      user.id,
      newUserLeadMeasures
    );
    });


    const response = await wigService.getWig(wigId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.updateUserLead = async (req, res, next) => {
    const wigId = req.params.wigId;
    const leadId = req.params.leadId;
    const userId = req.params.userId;
  try{ 
    const user = await userService.getUser(userId);
    const matchingLeadMeasure = user.leadMeasures.filter(obj => obj.wigId === wigId && obj.leadId === leadId);
    const indexMatchingLeadMeasure = user.leadMeasures.findIndex(obj => obj === matchingLeadMeasure[0]);
    const leadData = matchingLeadMeasure[0].leadData;
    const index = leadData.findIndex(obj => obj.startDate === req.body.leadData.startDate);
    leadData.splice(index, 1, req.body.leadData);
    matchingLeadMeasure[0].leadData = leadData;
    
    const newLeadMeasures = user.leadMeasures;
    newLeadMeasures.splice(indexMatchingLeadMeasure, 1 ,matchingLeadMeasure[0]);

    await userService.addUserLeadMeasure(
      user.id,
      newLeadMeasures
    );

    const response = await userService.getUser(userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

exports.updateLead = async (req, res, next) => {
  const wigId = req.params.wigId;
  const leadId = req.params.leadId;
  const leadMeasures = [
    {
      leadId: req.params.leadId,
      leadName: req.body.leadName,
      leadInterval: req.body.leadInterval,
      leadDataType: req.body.leadDataType,
      benchmarkExists: req.body.benchmarkExists,
      benchmark: req.body.benchmark
    },
  ];
  try {
    const wig = await wigService.getWig(wigId);
    const currentLeadMeasures = wig.leadMeasures;
    const filteredLeadMeasures = currentLeadMeasures.filter(
      (obj) => obj.leadId !== leadId
    );
    const newLeadMeasures = filteredLeadMeasures.concat(leadMeasures);
    await leadService.addLeadToWig(wigId, newLeadMeasures);
    const response = await wigService.getWig(wigId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

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

    // delete leads from users
    const teamId = wig.teamId;
    const users = await userService.getAllUsers(teamId);
    users.forEach(async user => {
      const newLeadMeasures = user.leadMeasures.filter(obj => obj.leadId !== leadId);
      await userService.addUserLeadMeasure(
        user.id,
        newLeadMeasures
      )
    })

    res
      .status(204)
      .json({ message: `Lead with id ${leadId} has been deleted` });
  } catch (error) {
    next(error);
  }
};
