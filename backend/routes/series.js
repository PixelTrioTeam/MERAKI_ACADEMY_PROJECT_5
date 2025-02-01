const express = require("express");
const { addSeries , getSeries } = require("../controllers/series");
const SeriesRouter = express.Router();

SeriesRouter.post("/addSeries", addSeries);
SeriesRouter.get("/", getSeries);


module.exports = SeriesRouter;
