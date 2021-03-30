const { createScoreboard } = require("../models/scoreboards");
const { v4: uuidv4 } = require("uuid");
const service = require("../services/scoreboards");

exports.createScoreboard = async (req, res, next) => {
  const scoreboardId = uuidv4();
  //   const wigName = req.body.wigName;
  //   const lagName = req.body.lagName;
  //   const lagDataType = req.body.lagDataType;
  //   const lagInterval = req.body.lagInterval;
  //   const startDate = req.body.startDate;
  //   const endDate = req.body.endDate;
  //   const lagData = [{ startDate: "", actual: 0, goal: 0 }];
  try {
    await createScoreboard(
      scoreboardId
      //   wigName,
      //   lagName,
      //   lagDataType,
      //   lagInterval,
      //   startDate,
      //   endDate,
      //   lagData
    );
    const response = await service.getScoreboard(scoreboardId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

exports.deleteScoreboard = async (req, res, next) => {
  const scoreboardId = req.params.scoreboardId;
  try {
    await service.deleteScoreboard(scoreboardId);
    res
      .status(204)
      .json({ message: `Scoreboard with id ${scoreboardId} has been deleted` });
  } catch (error) {
    next(error);
  }
};
