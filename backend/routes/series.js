const express = require("express");
const { addSeries } = require("../controllers/series");
const SeriesRouter = express.Router();

SeriesRouter.post("/addSeries", addSeries);

module.exports = SeriesRouter;
