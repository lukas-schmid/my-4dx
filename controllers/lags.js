const lagService = require("../services/lags");
const wigService = require("../services/wigs");

exports.updateLag = async (req, res, next) => {
  const wigId = req.params.wigId;
  const lagData = [
    {
      startDate: req.body.startDate,
      actual: req.body.actual,
      goal: req.body.goal,
    },
  ];
  try {
    await lagService.updateLead(wigId, lagData);
    const response = await wigService.getWig(wigId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
