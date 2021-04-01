const { v4: uuidv4 } = require("uuid");
const leadService = require("../services/leads");
const wigService = require("../services/wigs");

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
      leadData: [{ startDate: "", data: 0 }],
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
      benchmark: req.body.benchmark,
      leadData: [
        {
          startDate: req.body.leadData[0].startDate,
          date: req.body.leadData[0].data,
        },
      ],
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
  const leadId = req.params.leadId;
  try {
    await leadService.deleteLead(leadId);
    res
      .status(204)
      .json({ message: `Lead with id ${leadId} has been deleted` });
  } catch (error) {
    next(error);
  }
};
